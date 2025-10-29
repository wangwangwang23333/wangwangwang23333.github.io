---
title: ElementUI2 开发
date: 2023-04-25 12:06:16
tags:
---
需要python2环境

https://www.wyr.me/post/658

```she
brew install pyenv
pyenv install 2.7.18
export PATH="$(pyenv root)/shims:${PATH}"
pyenv global 2.7.18
python --version
```



需要注意node-sass版本的对应关系

如，默认的node-sass是4.11.0，而这个版本对node有要求：

| OS           | Architecture | Node                                                   |
| ------------ | ------------ | ------------------------------------------------------ |
| Windows      | x86 & x64    | 0.10, 0.12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11          |
| OSX          | x64          | 0.10, 0.12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11          |
| Linux*       | x86 & x64    | 0.10, 0.12, 1, 2, 3, 4, 5, 6, 7, 8**, 9**, 10**^, 11** |
| Alpine Linux | x64          | 6, 8, 10, 11                                           |

所以使用nvm install 11，先下载11版本的node
