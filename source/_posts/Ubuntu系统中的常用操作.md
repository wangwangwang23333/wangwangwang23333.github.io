---
title: Ubuntu系统中的常用操作
date: 2023-04-24 20:37:11
tags:
---

## jenkins的配置

安装jenkins：

https://blog.csdn.net/wf908164152/article/details/125716221

```shell
sudo apt-get install maven
```

设置权限：

```shell
vim /etc/default/jenkins
```

![image-20230409210155014](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/uPic/image-20230409210155014.png)

```shell
# 把jenkins目录文件交给ubuntu用户
chown -R ubuntu:ubuntu /var/lib/jenkins
```

安装gitee、maven、nodejs插件

```shell
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt -y install nodejs
```

![image-20230409201414802](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/uPic/image-20230409201414802.png)

设置jenkins令牌（https://blog.csdn.net/weixin_44931933/article/details/127704724）

新建项目：web hooks配置

配置maven

![image-20230409202701088](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/uPic/image-20230409202701088.png)

## screen的使用

参考文章：https://blog.csdn.net/qq_34131701/article/details/124353270


## 防火墙的使用

https://blog.csdn.net/yt_php/article/details/104233920/
