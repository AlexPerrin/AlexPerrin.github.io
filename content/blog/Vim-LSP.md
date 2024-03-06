---
title: Neovim Language Server Protocol (LSP)
author: Alex Perrin
date: 2024-03-05
description: Install rust-analyzer
---

# Neovim Language Server Protocol (LSP)

##### [Prerequisite] Install Rust
```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

##### Install rust-analyzer
```bash
$ rustup component add rust-analyzer
```

##### Append to ~/config/nvim/init.lua
```lua
lua require'lspconfig'.rust_analyzer.setup({})
```