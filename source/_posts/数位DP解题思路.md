---
title: 数位DP解题思路
date: 2024-01-16 13:04:31
tags:
---
## 参考链接

https://oi-wiki.org/dp/number/

https://blog.csdn.net/JKdd123456/article/details/81383012

### demo

> 题目大意：多组数据，每次给定区间  [n,m]  ，求在n到m中没有  “62“ （连续）或 “4“ 的数的个数。
> 如62315包含62，88914包含4，这两个数都是不合法的。
> 0 < n<=m < 1000000



试想：我们如果能有一个函数count(int x)，可以返回[0,x]之间符合题意的数的个数。

那么是不是直接输出count(m)-count(n-1)就是答案？

设一个数组dp[i][j]表示i位数，最高位是j 的符合题意的个数



### 模板

https://leetcode.cn/problems/count-special-integers/solutions/1746956/shu-wei-dp-mo-ban-by-endlesscheng-xtgx/
