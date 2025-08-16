---
title: Neovim Language Server Protocol (LSP)
date: 2024-03-05
draft: true
---

[Optional] Install Rust
```sh
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

[Optional] Install rust-analyzer
```sh
$ rustup component add rust-analyzer
```

Append to ~/config/nvim/init.lua
```lua
lua require'lspconfig'.rust_analyzer.setup({})
```