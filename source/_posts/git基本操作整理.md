---
title: Git基本操作整理
date: 2022-3-29 12:00:00
description: git的一些基本操作，一起交流学习
cover: https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/62425f9be0486.png
---

# Git 基本操作整理

## 前言

本文档通过整理CS-Notes中的Git命令操作与实战Learn Git Branching来学习掌握Git方法。因为文档主要分为两部分，第一部分参考CS-Notes并查阅资料为Git理论知识，第二部分为实战Learn Git Branching给出个人思考与过程。

参考资料来源:

1. [CS-Notes Git部分](http://www.cyc2018.xyz/%E5%85%B6%E5%AE%83/%E7%BC%96%E7%A0%81%E5%AE%9E%E8%B7%B5/Git.html#%E9%9B%86%E4%B8%AD%E5%BC%8F%E4%B8%8E%E5%88%86%E5%B8%83%E5%BC%8F)

2. [Learn Git Branching](https://learngitbranching.js.org/?demo=&locale=zh_CN)

## Git知识



## Learn Git Branching

### Level 1. Git基础内容

#### Git Commit

Git 仓库中的提交记录保存的是你的目录下所有文件的快照，就像是把整个目录复制，然后再粘贴一样，但比复制粘贴优雅许多！

Git 希望提交记录尽可能地轻量，因此在你每次进行提交时，它并不会盲目地复制整个目录。条件允许的情况下，它会将当前版本与仓库中的上一个版本进行对比，并把所有的差异打包到一起作为一个提交记录。Git 还保存了提交的历史记录。这也是为什么大多数提交记录的上面都有父节点的原因。对于项目组的成员来说，维护提交历史对大家都有好处。

Git Commit 就是在父节点下进行一次内容的提交。使用的命令很简单为：

💯==**git commit**==



![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/62425f9be0486.png)

------

#### Git Branch

Git 的分支也非常轻量。它们只是简单地指向某个提交纪录 —— 仅此而已。

所以许多 Git 爱好者传颂：😍**早建分支，多用分支！**

这是因为即使创建再多的分支也不会造成储存或内存上的开销，并且按逻辑分解工作到不同的分支要比维护那些特别臃肿的分支简单多了。

在将分支和提交记录结合起来后，我们会看到两者如何协作。现在只要记住使用分支其实就相当于在说：“**我想基于这个提交以及它所有的父提交进行新的工作。**”

创建分支的命令最基础的就是：

💯==**git branch <branch_name>**==

创建好的分支会指向当前的提交记录。但是通过上述命令创建的分支并不是我们现在所使用的分支，如果我们此刻进行了git commit操作，那么我们的行为仍然是操作于原来的分支。所以我们如果想要使用这个新分支，我们需要使用切换分支的命令：

💯==**git checkout <branch_name>**==

有一个简洁的方式，如果你想创建一个新的分支同时切换到新创建的分支的话，可以通过 

💯==**git checkout -b \<your-branch-name\>**==



![](https://i0.hdslb.com/bfs/album/a11e89444b0b5c7d221325a9637f26e54ebe12c6.png)

------

#### Git Merge

在知道如何提交以及如何使用分支的前提下，接下来是如何将两个分支合并到一起。就是说我们新建一个分支，在其上开发某个新功能，开发完成后再合并回主线。

第一种方法是通过git merge实现的。在 Git 中合并两个分支时会产生一个特殊的提交记录，它有两个父节点。翻译成自然语言相当于：“我要把这两个父节点本身及它们所有的祖先都包含进来。”因此，git合并分支的命令是：

💯==**git merge <branch_name>**==

该命令是将branch_name合并到当前的分支下

例如：我们有这两个分支main与bugFix，我们可以通过git merge命令来将两者合并：

<img src="https://i0.hdslb.com/bfs/album/1a7e02089e6db4f76cec7be3ca3766caa38c1fd7.png" style="zoom:50%;" />

合并后，我们发现新的分支是保留了两条路径指向父节点，并没有断了与任何一条分支的联系，因此这个过程支持了Git对历史版本信息的维护。

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/62425f858fa9e.png" style="zoom:50%;" />

接下来，可以将main分支合并到bugFix中

通过`git checkout bugFix; git merge main`

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/62425f8526a06.png" style="zoom:50%;" />

因为 main 继承自 bugFix ，Git 什么都不用做，只是简单地把 bugFix 移动到 main 所指向的那个提交记录。

![](https://i0.hdslb.com/bfs/album/08d9d8343a7164f9c6b01eccca5471872790f07f.png)

------

#### Git Rebase

第二种合并分支的方法是 git rebase。Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。

Rebase 的优势就是可以创造更线性的提交历史，这听上去有些难以理解。如果只允许使用 Rebase 的话，代码库的提交历史将会变得异常清晰。Rebase的命令如下：

💯==**git rebase <branch_name>**==

例如：同样我们有两个分支main和bugFix，我们可以通过rebase来将两者合并：

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/62425f857516e.png" style="zoom:50%;" />

通过rebase命令后，不同于原来的merge建立两条关于父节点的链接，而是通过提取一系列的提交记录然后建立一个基于main的副本，这样生成的线性的提交历史：

<img src="https://i0.hdslb.com/bfs/album/59f7e1df1314389ddbbcb14fda46a0a679d6c999.png" style="zoom:50%;" />

此时，原先分支的C3并没有被删除，接下来可以切换到main分支，通过rebase向前推进一个版本

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/62425f857627e.png" style="zoom:50%;" />

rebase命令维护一条线性的提交记录使得历史提交很清晰。我理解的话，主要是通过在代合并的分支上补充原有分支的一些历史提交信息，然后类似于“复制”了一个版本到待合并分支下，实现一个合并操作。

![](https://i0.hdslb.com/bfs/album/8ee6ba5797dbd7b567f3a9f05c43a9d88472e13d.png)

------

### Level 2. Git高级内容

#### 分离HEAD

HEAD 是一个对当前检出记录的符号引用 —— 也就是指向你正在其基础上进行工作的提交记录。

HEAD 总是指向当前分支上最近一次提交记录。大多数修改提交树的 Git 命令都是从改变 HEAD 的指向开始的。

HEAD 通常情况下是指向分支名的（如 bugFix）。在你提交时，改变了 bugFix 的状态，这一变化通过 HEAD 变得可见。

**分离的 HEAD 就是让其指向了某个具体的提交记录而不是分支名。**在命令执行之前的状态如下所示：

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242631f0352b.png" style="zoom:50%;" />

HEAD -> main -> C1

HEAD 指向 main， main 指向 C1

再通过 **git checkout C1** 后变成了：

HEAD -> C1

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624263c60010b.png" style="zoom:50%;" />



所以分离当前HEAD是通过：

💯==**git checkout \<hash_commit\>**==

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624264090b652.png)

------

#### 相对引用(^)

通过指定提交记录哈希值的方式在 Git 中移动不太方便。在实际应用时，并没有像本程序中这么漂亮的可视化提交树供你参考，所以你就不得不用 `git log` 来查查看提交记录的哈希值。

并且哈希值在真实的 Git 世界中也会更长（e.g. 基于 SHA-1，共 40 位）。例如前一关的介绍中的提交记录的哈希值可能是 `fed2da64c0efc5293610bdd892f82a58e8cbc5d8`。比较令人欣慰的是，Git 对哈希的处理很智能。你只需要提供能够唯一标识提交记录的前几个字符即可。因此我可以仅输入`fed2` 而不是上面的一长串字符。

通过哈希值提交记录很不方便，所以git引用了相对引用。使用相对引用的话，就可以从一个易于记忆的地方（比如 `bugFix` 分支或 `HEAD`）开始计算。

相对引用非常给力，这里我介绍两个简单的用法：

- 使用 `^` 向上移动 1 个提交记录
- 使用 `~<num>` 向上移动多个提交记录，如 `~3`

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624274834cddb.png" style="zoom:50%;" />

通过使用(\^)可以相对很方便找到main的父节点，而不是通过哈希的方式，以此类推，可以通过main\^\^来实现寻找父节点的父节点
💯==**git checkout main\^**==

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624274aea1027.png" style="zoom:50%;" />



![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624276378ff5f.png)

------

#### 相对引用2(~)

如果你想在提交树中向上移动很多步的话，敲那么多 `^` 貌似也挺烦人的，Git 当然也考虑到了这一点，于是又引入了操作符 `~`。该操作符后面可以跟一个数字（可选，不跟数字时与 `^` 相同，向上移动一次），指定向上移动多少次。

通过多次移动的相对引用命令，实现简洁的后退操作：

💯==**git checkout HEAD\~\<num\>**==

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624276db5423e.png" style="zoom:50%;" />



使用相对引用比较多的场景就是移动分支。可以直接使用 `-f` 选项让分支指向另一个提交，达到强制修改分支的目的，例如:

💯==**git branch -f main HEAD~3**==

上面的命令会将 main 分支强制指向 HEAD 的第 3 级父提交。

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/62427882a6119.png" style="zoom:50%;" />

可以发现main分支指向了是HEAD向后移动3级父提交记录上

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242a3729f60c.png" style="zoom:50%;" />

合理使用git branch -f 与git checkout 可以实现对当前提交节点与分支的转换。

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242a5ae757e9.png)

------

#### 撤销变更

在 Git 里撤销变更的方法很多。和提交一样，撤销变更由底层部分（暂存区的独立文件或者片段）和上层部分（变更到底是通过哪种方式被撤销的）组成。我们这个应用主要关注的是后者。

主要有两种方法用来撤销变更 —— 一是 `git reset`，还有就是 `git revert`。

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242a6fb59604.png" style="zoom:50%;" />

通过一下撤销变更的命令：

💯==**git reset HEAD~1**==

Git 把 main 分支移回到 C1；现在我们的本地代码库根本就不知道有 C2 这个提交了。但是在reset后， C2 所做的变更还在，但是处于未加入暂存区状态。

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242a76660edc.png" style="zoom:50%;" />

git reset 撤销的方式对大家一起使用的远端分支是无效的，为了撤销更改并分享给别人，我们需要使用：

💯==**git revert HEAD**==

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242a82f31d87.png" style="zoom:50%;" />

在我们要撤销的提交记录后面居然多了一个新提交！这是因为新提交记录 C2' 引入了**更改** —— 这些更改刚好是用来撤销 C2 这个提交的。也就是说 C2' 的状态与 C1 是相同的。revert 之后就可以把你的更改推送到远程仓库与别人分享啦。

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242a9486b1f8.png)

刚才试了一下reset的作用，其实就是本地回退到上一个版本得话，可以在更改一些功能后，通过rebase或者merge指定遗弃分支进行合并或者完全放弃？🤔

------

### Level 3. Git移动提交记录

#### Git Cherry-pick

接下来要讨论的这个话题是“整理提交记录” —— 开发人员有时会说“我想要把这个提交放到这里, 那个提交放到刚才那个提交的后面”, 而接下来就讲的就是它的实现方式，非常清晰、灵活，还很生动。

如果你想将一些提交复制到当前所在的位置（`HEAD`）下面的话， Cherry-pick 是最直接的方式了。命令为：

💯==**git cherry-pick \<commit_version\>**==

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242aab507c99.png" style="zoom:50%;" />

这里有一个仓库, 我们想将 side 分支上的工作复制到 main 分支，rebase 可以解决这个问题，但是也可以通过 cherry-pick, 我们执行命令 git cherry-pick C2 C4

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ab6297234.png" style="zoom:50%;" />

通过cherry-pick可以直接选取我们要的提交记录在当前分支之下，感觉git的整理提交记录的思想在于维护一条提交的线(主干线)

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242abd0e399a.png)

------

#### 交互式rebase

当你知道你所需要的提交记录（**并且**还知道这些提交记录的哈希值）时, 用 cherry-pick 再好不过了 —— 没有比这更简单的方式了。但是如果你不清楚你想要的提交记录的哈希值呢? 幸好 Git 帮你想到了这一点, 我们可以利用交互式的 rebase —— 如果你想从一系列的提交记录中找到想要的记录, 这就是最好的方法了。

交互式 rebase 指的是使用带参数 `--interactive` 的 rebase 命令, 简写为 `-i`

如果你在命令后增加了这个选项, Git 会打开一个 UI 界面并列出将要被复制到目标分支的备选提交记录，它还会显示每个提交记录的哈希值和提交说明，提交说明有助于你理解这个提交进行了哪些更改。

在实际使用时，所谓的 UI 窗口一般会在文本编辑器 —— 如 Vim —— 中打开一个文件。

当 rebase UI界面打开时, 你能做3件事:

- 调整提交记录的顺序（通过鼠标拖放来完成）
- 删除你不想要的提交（通过切换 `pick` 的状态来完成，关闭就意味着你不想要这个提交记录）
- 合并提交。

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242af2c739cb.png" style="zoom:50%;" />

输入交互式rebase命令后：

💯==**git rebase -i HEAD[~\<num\>|^]**==

通过rebase -i HEAD~4实现对后续提交内容进行调整顺序，删除omit提交与合并

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242b17d54c69.png" style="zoom:50%;" />

完全重新整理了commit的顺序，但是感觉需要以合理的机会使用，要不然真的会很艰难。

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242b33615af6.png)

------

### Level 4. 杂项

#### 只取一个提交记录

来看一个在开发中经常会遇到的情况：我正在解决某个特别棘手的 Bug，为了便于调试而在代码中添加了一些调试命令并向控制台打印了一些信息。

这些调试和打印语句都在它们各自的提交记录里。最后我终于找到了造成这个 Bug 的根本原因，解决掉以后觉得沾沾自喜！

最后就差把 `bugFix` 分支里的工作合并回 `main` 分支了。你可以选择通过 fast-forward 快速合并到 `main` 分支上，但这样的话 `main` 分支就会包含我这些调试语句了。你肯定不想这样，应该还有更好的方式……

实际我们只要让 Git 复制解决问题的那一个提交记录就可以了。跟之前我们在“整理提交记录”中学到的一样，我们可以使用

- `git rebase -i`
- `git cherry-pick`

来达到目的。

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242b98be1504.png)

------

#### 提交的技巧 #1

接下来这种情况也是很常见的：你之前在 newImage 分支上进行了一次提交，然后又基于它创建了 caption 分支，然后又提交了一次。

此时你想对某个以前的提交记录进行一些小小的调整。比如设计师想修改一下 `newImage` 中图片的分辨率，尽管那个提交记录并不是最新的了。

我们可以通过下面的方法来克服困难：

- 先用 `git rebase -i` 将提交重新排序，然后把我们想要修改的提交记录挪到最前
- 然后用 `git commit --amend` 来进行一些小修改
- 接着再用 `git rebase -i` 来将他们调回原来的顺序
- 最后我们把 main 移到修改的最前端（用你自己喜欢的方法），就大功告成啦！

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242dbc3cd20f.png)

------

#### 提交的技巧 #2

正如你在上一关所见到的，我们可以使用 `rebase -i` 对提交记录进行重新排序。只要把我们想要的提交记录挪到最前端，我们就可以很轻松的用 `--amend` 修改它，然后把它们重新排成我们想要的顺序。

但这样做就唯一的问题就是要进行两次排序，而这有可能造成由 rebase 而导致的冲突。因此选择使用cherry-pick来实现上述问题。

cherry-pick 可以将提交树上任何地方的提交记录取过来追加到 HEAD 上

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ddc84217c.png)

------

#### Git Tag

分支很容易被人为移动，并且当有新的提交时，它也会移动。分支很容易被改变，大部分分支还只是临时的，并且还一直在变。有没有什么可以永远指向某个提交记录的标识呢，比如软件发布新的大版本，或者是修正一些重要的 Bug 或是增加了某些新特性，有没有比分支更好的可以永远指向这些提交的方法呢？

Git 的 tag 可以（在某种程度上 —— 因为标签可以被删除后重新在另外一个位置创建同名的标签）永久地将某个特定的提交命名为里程碑，然后就可以像分支一样引用了。更难得的是，它们并不会随着新的提交而移动。你也不能切换到某个标签上面进行修改提交，它就像是提交树上的一个锚点，标识了某个特定的位置。

tag的命令是：

💯==**git tag \<tag_name\> \<commit_name\>**==

![image-20220329183103581](C:\Users\14218\AppData\Roaming\Typora\typora-user-images\image-20220329183103581.png)

------

#### Git Describe

由于标签在代码库中起着“锚点”的作用，Git 还为此专门设计了一个命令用来**描述**离你最近的锚点（也就是标签），它就是 `git describe`！

Git Describe 能帮你在提交历史中移动了多次以后找到方向；当你用 `git bisect`（一个查找产生 Bug 的提交记录的指令）找到某个提交记录时，或者是当你坐在你那刚刚度假回来的同事的电脑前时， 可能会用到这个命令。

git describe的语法是：

💯==**git describe \<ref\>**==	

ref 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会以你目前所检出的位置（HEAD）.

返回类型为💯==**\<tag\>\_\<numCommits\>\_g\<hash\>**==	

tag 表示的是离 ref 最近的标签， numCommits 是表示这个 ref 与 tag 相差有多少个提交记录， hash 表示的是你所给定的 ref 所表示的提交记录哈希值的前几位。当 ref 提交记录上有某个标签时，则只输出标签名称。

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242e388a4335.png)

------

### Level 5. Git 高级话题(某些应用)

#### 多分支rebase

通过rebase实现多个分支的合并操作，其实通过rebase branch1 branch2 可以很快的实现，并且记住的是branch1是branch2的父分支的话就很容易实现了，每次rebase应该省略的是branch2的参数(如果不给的话)

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242e564c9d33.png)

------

#### 两个父节点

操作符 `^` 与 `~` 符一样，后面也可以跟一个数字。

但是该操作符后面的数字与 `~` 后面的不同，并不是用来指定向上返回几代，而是指定合并提交记录的某个父提交。还记得前面提到过的一个合并提交有两个父提交吧，所以遇到这样的节点时该选择哪条路径就不是很清晰了。

Git 默认选择合并提交的“第一个”父提交，在操作符 `^` 后跟一个数字可以改变这一默认行为。

例如，执行 git checkout main^2 的过程就是回到第二个父提交节点的意思。

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242e67ed88f1.png" style="zoom:50%;" />

并且git支持两个操作符的链式操作 git checkout main\~\^2\~2

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242e6cb0c441.png" style="zoom:50%;" />



![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242e85b0e9c3.png)

------

#### 纠缠不清的分支

实现这种不同分支梳理最好的方式是通过cherry-pick，如果方便知道commit的提交哈希值的话。

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242e9658f176.png)

------

### Level 6. Push & Pull —— Git 远程仓库

#### Git Clone

远程仓库并不复杂, 在如今的云计算盛行的世界很容易把远程仓库想象成一个富有魔力的东西, 但实际上它们只是你的仓库在另个一台计算机上的拷贝。你可以通过因特网与这台计算机通信 —— 也就是增加或是获取提交记录

话虽如此, 远程仓库却有一系列强大的特性

- 首先也是最重要的的点, 远程仓库是一个强大的备份。本地仓库也有恢复文件到指定版本的能力, 但所有的信息都是保存在本地的。有了远程仓库以后，即使丢失了本地所有数据, 你仍可以通过远程仓库拿回你丢失的数据。
- 还有就是, 远程让代码社交化了! 既然你的项目被托管到别的地方了, 你的朋友可以更容易地为你的项目做贡献(或者拉取最新的变更)

💯==**git clone**==

通过git clone 可以从远端拉取仓库到本地

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ea37dc283.png)

------

#### 远端分支

你可能注意到的第一个事就是在我们的本地仓库多了一个名为 `o/main` 的分支, 这种类型的分支就叫**远程**分支。由于远程分支的特性导致其拥有一些特殊属性。

远程分支反映了远程仓库(在你上次和它通信时)的**状态**。这会有助于你理解本地的工作与公共工作的差别 —— 这是你与别人分享工作成果前至关重要的一步.

远程分支有一个特别的属性，在你检出时自动进入分离 HEAD 状态。Git 这么做是出于不能直接在这些分支上进行操作的原因, 你必须在别的地方完成你的工作, （更新了远程分支之后）再用远程分享你的工作成果。

o/main的意思就是\<remote name\>/\<branch name\>

如果当前选择的是远端分支的话，进行commit操作是不会直接进行远端分支的更新，而是使本地处于分离HEAD的状态。

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242eb32490c4.png)

------

#### Git Fetch

Git 远程仓库相当的操作实际可以归纳为两点：向远程仓库传输数据以及从远程仓库获取数据。既然我们能与远程仓库同步，那么就可以分享任何能被 Git 管理的更新（因此可以分享代码、文件、想法、情书等等）。

如何从远程仓库获取数据 —— 命令如其名，它就是 git fetch 。

💯==**git fetch**==

**Git Fetch Do:**

git fetch 完成了仅有的但是很重要的两步:

- 从远程仓库下载本地仓库中缺失的提交记录
- 更新远程分支指针(如 `o/main`)

git fetch 实际上将本地仓库中的远程分支更新成了远程仓库相应分支最新的状态。

如果你还记得上一节课程中我们说过的，远程分支反映了远程仓库在你**最后一次与它通信时**的状态，git fetch 就是你与远程仓库通信的方式了！

**Git Fetch Not Do:**

git fetch 并不会改变你本地仓库的状态。它不会更新你的 main 分支，也不会修改你磁盘上的文件。

理解这一点很重要，因为许多开发人员误以为执行了 git fetch 以后，他们本地仓库就与远程仓库同步了。它可能已经将进行这一操作所需的所有数据都下载了下来，但是**并没有**修改你本地的文件。git fetch 就是单纯的下载资源的操作。

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ecb8f2bac.png)

------

#### Git Pull

其实有很多方法的 —— 当远程分支中有新的提交时，你可以像合并本地分支那样来合并远程分支。也就是说就是你可以执行以下命令:

- `git cherry-pick o/main`
- `git rebase o/main`
- `git merge o/main`
- 等等

实际上，由于先抓取更新再合并到本地分支这个流程很常用，因此 Git 提供了一个专门的命令来完成这两个操作。

💯==**git pull**==

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ed89ae9c4.png" style="zoom:50%;" />

git pull 就是 git fetch 和 git merge的缩写

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ee13e8cad.png)

------

#### 模拟团队合作

在远端操作进行一定更新后，可以通过pull进行及时的拉去更新本地分支

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ee9fb29ea.png)

------

#### Git Push

传自己分享内容与下载他人的分享刚好相反，git push 负责将**你的**变更上传到指定的远程仓库，并在远程仓库上合并你的新提交记录。一旦 git push 完成, 你的朋友们就可以从这个远程仓库下载你分享的成果了！

💯==**git push**==

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ef5af3f83.png)

------

#### 偏离的提交历史

假设你周一克隆了一个仓库，然后开始研发某个新功能。到周五时，你新功能开发测试完毕，可以发布了。但是 —— 天啊！你的同事这周写了一堆代码，还改了许多你的功能中使用的 API，这些变动会导致你新开发的功能变得不可用。但是他们已经将那些提交推送到远程仓库了，因此你的工作就变成了基于项目**旧版**的代码，与远程仓库最新的代码不匹配了。

这种情况下, `git push` 就不知道该如何操作了。如果你执行 `git push`，Git 应该让远程仓库回到星期一那天的状态吗？还是直接在新代码的基础上添加你的代码，亦或由于你的提交已经过时而直接忽略你的提交？

因为这情况（历史偏离）有许多的不确定性，Git 是不会允许你 `push` 变更的。实际上它会强制你先合并远程最新的代码，然后才能分享你的工作。

因此主要的解决办法就是先把远端的分支pull下来，然后再merge或者rebase自己的工作到远端分支，然后再合并分支到远端仓库

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242f10bed8b1.png)

------

#### Locked Main

如果你是在一个大的合作团队中工作, 很可能是main被锁定了, 需要一些Pull Request流程来合并修改。如果你直接提交(commit)到本地main, 然后试图推送(push)修改, 你将会收到这样类似的信息:

*! [远程服务器拒绝] main -> main (TF402455: 不允许推送(push)这个分支; 你必须使用pull request来更新这个分支.)*

就是在团队合作的时候，防止过多人频繁push自己的代码到远端仓库，因此需要走pr的审查流程。

解决办法为：新建一个分支feature, 推送到远程服务器. 然后reset你的main分支和远程服务器保持一致, 否则下次你pull并且他人的提交和你冲突的时候就会有问题.

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242f48497d61.png)

------

### Level 7. 关于 origin 和它的周边 —— Git 远程仓库高级操作

#### 推送主分支

在大型项目中开发人员通常会在（从 `main` 上分出来的）特性分支上工作，工作完成后只做一次集成。这跟前面课程的描述很相像（把 side 分支推送到远程仓库），不过本节我们会深入一些.

但是有些开发人员只在 main 上做 push、pull —— 这样的话 main 总是最新的，始终与远程分支 (o/main) 保持一致。

对于接下来这个工作流，我们集成了两个步骤：

- 将特性分支集成到 `main` 上
- 推送并更新远程分支

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242fc03cb835.png)

过程就是先 git pull --rebase 然后再rebase 合并分支

------

#### 合并远端仓库

在开发社区里，有许多关于 merge 与 rebase 的讨论。以下是关于 rebase 的优缺点：

优点:

- Rebase 使你的提交树变得很干净, 所有的提交都在一条线上

缺点:

- Rebase 修改了提交树的历史

比如, 提交 C1 可以被 rebase 到 C3 之后。这看起来 C1 中的工作是在 C3 之后进行的，但实际上是在 C3 之前。

一些开发人员喜欢保留提交历史，因此更偏爱 merge。而其他人（比如我自己）可能更喜欢干净的提交树，于是偏爱 rebase。仁者见仁，智者见智。 

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242fd476265d.png)

相对来说，更有细节，更能体现提交历史

#### 远程追踪

Git 好像知道 `main` 与 `o/main` 是相关的。当然这些分支的名字是相似的，可能会让你觉得是依此将远程分支 main 和本地的 main 分支进行了关联。这种关联在以下两种情况下可以清楚地得到展示：

- pull 操作时, 提交记录会被先下载到 o/main 上，之后再合并到本地的 main 分支。隐含的合并目标由这个关联确定的。
- push 操作时, 我们把工作从 `main` 推到远程仓库中的 `main` 分支(同时会更新远程分支 `o/main`) 。这个推送的目的地也是由这种关联确定的！

直接了当地讲，`main` 和 `o/main` 的关联关系就是由分支的“remote tracking”属性决定的。`main` 被设定为跟踪 `o/main` —— 这意味着为 `main` 分支指定了推送的目的地以及拉取后合并的目标。

你可能想知道 `main` 分支上这个属性是怎么被设定的，你并没有用任何命令指定过这个属性呀！好吧, 当你克隆仓库的时候, Git 就自动帮你把这个属性设置好了。

当你克隆时, Git 会为远程仓库中的每个分支在本地仓库中创建一个远程分支（比如 `o/main`）。然后再创建一个跟踪远程仓库中活动分支的本地分支，默认情况下这个本地分支会被命名为 `main`。

克隆完成后，你会得到一个本地分支（如果没有这个本地分支的话，你的目录就是“空白”的），但是可以查看远程仓库中所有的分支（如果你好奇心很强的话）。这样做对于本地仓库和远程仓库来说，都是最佳选择。

💯==**git checkout -b totallyNotMain o/main**==

可以创建一个totallyNotMain来追踪远程分支o/main

💯==**git branch -u o/main foo**==

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6242ff7627ed3.png)

------

#### Git Push的参数

首先来看 `git push`。在远程跟踪课程中，你已经学到了 Git 是通过当前检出分支的属性来确定远程仓库以及要 push 的目的地的。这是未指定参数时的行为，我们可以为 push 指定参数，语法是：

💯==**git push \<remote\> \<place\>**==

把这个命令翻译过来就是：

*切到本地仓库中的“main”分支，获取所有的提交，再到远程仓库“origin”中找到“main”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。*

我们通过“place”参数来告诉 Git 提交记录来自于 main, 要推送到远程仓库中的 main。它实际就是要同步的两个仓库的位置。

需要注意的是，因为我们通过指定参数告诉了 Git 所有它需要的信息, 所以它就忽略了我们所检出的分支的属性！

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624300d69d378.png)

------

#### Git Push的参数2

，当为 git push 指定 place 参数为 `main` 时，我们同时指定了提交记录的来源和去向。

你可能想问 —— 如果来源和去向分支的名称不同呢？比如你想把本地的 `foo` 分支推送到远程仓库中的 `bar` 分支。

要同时为源和目的地指定 `<place>` 的话，只需要用冒号 `:` 将二者连起来就可以了：

💯==**git push origin \<source\>:\<destination\>**==

这个参数实际的值是个 refspec，“refspec” 是一个自造的词，意思是 Git 能识别的位置（比如分支 `foo` 或者 `HEAD~1`）

一旦你指定了独立的来源和目的地，就可以组织出言简意赅的远程操作命令了.

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624301c9cddfe.png)

------

#### Git Fetch的参数

`git fetch` 的参数和 `git push` 极其相似。他们的概念是相同的，只是方向相反罢了（因为现在你是下载，而非上传）

💯==**git fetch \<remote\> \<place\>**==

Git 会到远程仓库的分支上，然后获取所有本地不存在的提交，放到本地的相应分支上。

💯==**git fetch origin \<source\>:\<destination\>**==

但是命令很不常用就是了

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624301c9cddfe.png)

------

#### 没有source的source

Git 有两种关于 `<source>` 的用法是比较诡异的，即你可以在 git push 或 git fetch 时不指定任何 `source`，方法就是仅保留冒号和 destination 部分，source 部分留空。

- `git push origin :side`
- `git fetch origin :bugFix`

我们分别来看一下这两条命令的作用……

如果 push 空 到远程仓库会如何呢？它会删除远程仓库中的分支！

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624313c20ceea.png" style="zoom:50%;" />

如果 fetch 空 到本地，会在本地创建一个新分支。

<img src="https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624314368592a.png" style="zoom:50%;" />



![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/6243147a70f05.png)

------

#### Git Pull的参数

 git pull 到头来就是 fetch 后跟 merge 的缩写。你可以理解为用同样的参数执行 git fetch，然后再 merge 你所抓取到的提交记录。

`git pull origin foo` 相当于：

```
git fetch origin foo; git merge o/foo
```

还有...

`git pull origin bar~1:bugFix` 相当于：

```
git fetch origin bar~1:bugFix; git merge bugFix
```

![](https://cdn.jsdelivr.net/gh/hututu-tech/IMG-gongfeng@main/2022/03/29/624316d49f61c.png)

------



## Git操作实例

> 在这一个月多的工作里，我也遇到了需要用到git的一些操作，在此总结如下情景：

### 先暂存当前工作而去完成另一个工作

> 遇到过这种情况：在做某个工作到一半还没完成的时候，突然被提醒先去做另外一个工作。这种情况下，现在没做完的工作咋办？

首先，在看了上面的内容之后，不管如果我们一定要先进行 `git commit` 操作。

因为只有在commit之后，当前工作才会成为一个结点。

同时，为了唯一标识当前结点，我们可以采用新建分支或者新建tag的方式标记当前结点：

```
git tag tag_name HEAD
```

在完成该操作后，我们就回到上一个结点，也就是远端所在结点：

```
git checkout HEAD^

git branch -f master HEAD

git checkout master
```

此后，我们便可以开始新的工作，以正常的方式进行新的操作（commit啊，push啊都可以）。

当前工作完成之后，我们就可以通过 ` git checkout tag_name ` 回到之前没有完成的工作中去了！

### 更改两次提交的顺序

> 这是今天遇到的一个情况：先完成了一个提交，之后去做另一个工作提交了一次。但这时被提示之前的提交有问题，需要修改。
>
> 这个时候，后一次的提交没有问题，可以被点进主分支中。但由于它的父结点是前一次的提交，因此点不进去，怎么办呢？

这个时候，我们就要考虑切换两个分支的顺序了。

首先最重要的是，我们还是要加一个标签标记当前的位置，否则以后就找不到了：

```
git tag tag_name HEAD
```

然后，我们回到上上一次的位置：

```
git checkout HEAD~2

git branch -f master HEAD

git checkout master
```

这个时候，我们只要通过 ` cherry-pick ` 操作把刚刚的两个操作反过来串联在一起就行了。

当然，通过前面的学习，我们知道  ` git rebase -i `也是可行的，在这里不再赘述。

