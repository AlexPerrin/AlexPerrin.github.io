---
title: Writing CLI Tools
date: 2024-02-04
---

Bash scripting doesn't have a defined way to interface with scripts. 
Usage strings, argument handling methods positional, shifting, and getopts
consider expanding for C and Python
 
## Usage/Help Message

Here is an example based on the NetBSD source code style guide:

`Usage: program [-aDde] [-f | -g] [-n number] [-b b_arg | -c c_arg] req1 req2 [opt1 [opt2]]`

This would indicate that "program" should be called with:

- options without operands: a, D, d, e (any of which may be omitted). Note that in this case some parameters are case-sensitive
- exclusive options: f, g (denoted by the vertical bar)
- options with operands: n
- exclusive options with operands: b, c
- required arguments: req1, req2
- optional argument opt1, which may be used with or without opt2 (marked optional within the group by using another set of square brackets)
- optional argument opt2, which requires opt1

## Bash
```bash
usage() {
  echo "Usage: $0 [OPTIONS]"
  echo "Options:"
  echo " -h, --help      Display this help message"
  echo " -v, --verbose   Enable verbose mode"
  echo " -f, --file      FILE Specify an output file"
}
```

### Built-In Variables

`$0` The Script Name

`$1, $2, $3, ...` Positional Arguments

`$#` Argument Count

`$@ and $*` All the Args

### Bash Test Function

[16.3 test: Check file types and compare values](https://www.gnu.org/software/coreutils/manual/html_node/test-invocation.html)

`-z string` True if the length of string is zero.

`-n string` True if the length of string is nonzero.

`arg1 -eq arg2` equal

`arg1 -ne arg2` not equal

`arg1 -lt arg2` less then

`arg1 -le arg2` less then equal

`arg1 -gt arg2` greater then

`arg1 -ge arg2` greater then equal

`! TEST` boolean NOT

### Basic Conditional Parsing

```bash
if [[ "$1" == -h ]]; then
  usage
  exit 0
fi
```

### Loop shift parsing

```bash
handle_options() {
  while [ $# -gt 0 ]; do
    case $1 in
      -h | --help)
        usage
        exit 0
        ;;
      -v | --verbose)
        verbose_mode=true
        ;;
      -f | --file*)
        if ! has_argument $@; then
          echo "File not specified." >&2
          usage
          exit 1
        fi

        output_file=$(extract_argument $@)

        shift
        ;;
      *)
        echo "Invalid option: $1" >&2
        usage
        exit 1
        ;;
    esac
    shift
  done
}
```

### `getopts`

Only supports shorthand single character options aka flags

```bash
aflag=
bflag=
while getopts ab: name
do
    case $name in
    a)    aflag=1;;
    b)    bflag=1
          bval="$OPTARG";;
    ?)   printf "Usage: %s: [-a] [-b value] args\n" $0
          exit 2;;
    esac
done
if [ ! -z "$aflag" ]; then
    printf "Option -a specified\n"
fi
if [ ! -z "$bflag" ]; then
    printf 'Option -b "%s" specified\n' "$bval"
fi
shift $(($OPTIND - 1))
printf "Remaining arguments are: %s\n" "$*"
```

### `getopt`

Supports short and long options

```bash
#!/bin/bash

# We use "${@}" instead of "${*}" to preserve argument-boundary information
ARGS=$(getopt --options 'a:l::v' --longoptions 'article:,lang::,language::,verbose' -- "${@}") || exit
eval "set -- ${ARGS}"

while true; do
    case "${1}" in
        (-v | --verbose)
            ((VERBOSE++))
            shift
        ;;
        (-a | --article)
            ARTICLE="${2}"
            shift 2
        ;;
        (-l | --lang | --language)
            # handle optional: getopt normalizes it into an empty string
            if [ -n "${2}" ] ; then
                LANG="${2}"
            fi
            shift 2
        ;;
        (--)
            shift
            break
        ;;
        (*)
            exit 1    # error
        ;;
    esac
done

remaining_args=("${@}")
```