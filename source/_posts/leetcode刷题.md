---
title: leetcode-数组题
date: 2021-1-26 00:00:00
description: leetcode上有关数组的题目
cover: https://s3.ax1x.com/2020/12/31/rvEA3T.jpg
---



### 4 寻找两个正序数组的中位数

1.遍历数组，使用类似于归并排序的两个指针一一比较大小

时间复杂度：O(N)

空间复杂度：O(1)

执行用时：48 ms, 在所有 C++ 提交中击败了83.73%的用户

内存消耗：86.9 MB, 在所有 C++ 提交中击败了95.52%的用户

```c++
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
	//O(N)
	int i = -1, j = -1;
	int size1 = nums1.size(), size2 = nums2.size();
	if ((size1 + size2) % 2 == 0)
	{
		//even
		int a;
		for (int k = 0; k < (size1 + size2) / 2 - 1; ++k)
		{
			if (i == size1 - 1)
				++j;
			else if (j == size2 - 1)
				++i;
			else if (nums1[i + 1] > nums2[j + 1])
			{
				++j;
			}
			else
				++i;
		}
		//choose two num;
		if (i == size1 - 1)
			a = nums2[++j];
		else if (j == size2 - 1)
			a = nums1[++i];
		else if (nums1[i + 1] > nums2[j + 1])
		{
			a = nums2[++j];
		}
		else
			a = nums1[++i];
		if (i == size1 - 1)
			a += nums2[++j];
		else if (j == size2 - 1)
			a += nums1[++i];
		else if (nums1[i + 1] > nums2[j + 1])
		{
			a += nums2[++j];
		}
		else
			a += nums1[++i];
		return a / 2.0;
	}
	else
	{
		for (int k = 0; k < (size1 + size2) / 2 ; ++k)
		{
			if (i == size1 - 1)
				++j;
			else if (j == size2 - 1)
				++i;
			else if (nums1[i + 1] > nums2[j + 1])
			{
				++j;
			}
			else
				++i;
		}
		if (i == size1 - 1)
			return nums2[++j];
		else if (j == size2 - 1)
			return nums1[++i];
		else if (nums1[i + 1] > nums2[j + 1])
		{
			return nums2[++j];
		}
		else
			return nums1[++i];
	}
}
```



### 5 最长回文子串

1.递推，利用状态转移方程dp[i] [j]表示字符串的i到j是否为回文串

初始条件：

- dp[i] [i]=true
- dp[i] [i+1]= s[i]==s[i+1]

转移条件：

- dp[i] [j]= true if dp[i+1] [j-1] and s[i]==s[j]

时间复杂度:O(N)

空间复杂度:O(N)

执行用时：456 ms, 在所有 C++ 提交中击败了41.14%的用户

内存消耗：7.9 MB, 在所有 C++ 提交中击败了77.31%的用户

```c++
string longestPalindrome(string s) {
	bool dp[1000][1000];
	int strLength = s.length();
	int maxS = -1, maxE = -1;
	for (int i = 0; i < strLength; ++i)
		for (int j = 0; j < strLength; ++j)
			dp[i][j] = false;
	//边界条件
	for (int i = 0; i < strLength; ++i)
	{
		dp[i][i] = true;
		maxS = i;
		maxE = i;
	}
	for (int i = 0; i < strLength - 1; ++i)
		if (s[i] == s[i + 1])
		{
			dp[i][i + 1] = true;
			maxS = i;
			maxE = i + 1;
		}
	//奇数转移方程
	for (int i = 0; i < strLength; ++i)
	{
		for (int j = 1; j <= i && j <= strLength - i - 1; ++j)
		{
			if (dp[i - j + 1][i + j - 1] && s[i - j] == s[i + j])
			{
				dp[i - j][i + j] = true;
			}
			if (dp[i - j][i + j] && 2 * j + 1 > maxE - maxS + 1)
			{
				maxS = i - j;
				maxE = i + j;
			}
		}
	}
	//偶数转移方程
	for (int i = 0; i < strLength - 1; ++i)
	{
		for (int j = 1; j <= i && j <= strLength - i - 2; ++j)
		{
			if (dp[i - j + 1][i + j ] && s[i - j] == s[i + j+1])
			{
				dp[i - j][i + j+1] = true;
			}
			if (dp[i - j][i + j+1] && 2 * j + 2 > maxE - maxS + 1)
			{
				maxS = i - j;
				maxE = i + j+1;
			}
		}
	}
	if (maxS == -1)
		return "";
	else
		return s.substr(maxS, maxE - maxS + 1);
}
```





### 6.Z字形变换

1.利用一个二维数组存储绘制出的Z字形，完成绘制后遍历二维数组每一个顺序输出

时间复杂度：O(N²)

空间复杂度：O(N²)

执行用时：1288 ms, 在所有 C++ 提交中击败了5.08%的用户

内存消耗：9.1 MB, 在所有 C++ 提交中击败了62.58%的用户

```c++
string convert(string s, int numRows) {
	char word[1000][1000] = { 0 };
	int row = 0, col = 0;
	bool shu = true;
	if (numRows == 1)
		return s;
	for (int i = 0; i < s.length(); ++i)
	{
		word[row][col] = s[i];
		if (shu)
		{
			if (row == numRows - 1)
			{
				shu = false;
				--row;
				++col;
			}
			else
				++row;
		}
		else
		{
			if (row == 0)
			{
				shu = true;
				++row;
			}
			else
			{
				--row;
				++col;
			}
		}
	}
	//顺序读取
	string ans;
	for (int i = 0; i < 1000; ++i)
		for (int j = 0; j < 1000; ++j)
			if (word[i][j] != 0)
				ans.push_back(word[i][j]);
	return ans;
}
```

2.思路类似于1，不过不再采用1中二维数组的方式存取数据

而是借鉴稀疏矩阵的方法，定义一个Node，将其存储在vector< Node >中。在绘制完毕后，重载比较运算符来进行排序。

时间复杂度：O(NlogN)

空间复杂度：O(N)

执行用时：36 ms, 在所有 C++ 提交中击败了20.65%的用户

内存消耗：12.6 MB, 在所有 C++ 提交中击败了17.63%的用户

```c++
struct Node
{
	int row;
	int col;
	char data;
	Node(int r, int c, char d)
	{
		row = r;
		col = c;
		data = d;
	}
	bool operator<(const Node& p2)
	{
		if (this->row < p2.row)
			return true;
		else return (this->row == p2.row&&this->col < p2.col);
			
	}
};



string convert(string s, int numRows) {
	vector<Node> result;//类似于稀疏矩阵
	int row = 0, col = 0;
	bool shu = true;
	if (numRows == 1)
		return s;
	for (int i = 0; i < s.length(); ++i)
	{
		result.push_back(Node(row, col, s[i]));
		if (shu)
		{
			if (row == numRows - 1)
			{
				shu = false;
				--row;
				++col;
			}
			else
				++row;
		}
		else
		{
			if (row == 0)
			{
				shu = true;
				++row;
			}
			else
			{
				--row;
				++col;
			}
		}
	}
	
	//对内部进行排序，先比较行，行小的在前，紧接着比较列
	//时间复杂度为O(NlogN)
	sort(result.begin(), result.end());
	string ans;

	for (auto i = result.begin(); i != result.end(); ++i)
	{
		ans.push_back(i->data);
	}
	return ans;
}
```



3.利用1的方法，不过不再采用二维数组存储，而是使用一个vector存储每一行的字符串。到每一行直接加入尾端即可。这样字符串总长度实际上只有N。

时间复杂度：O（N）

空间复杂度：O（N）

执行用时：8 ms, 在所有 C++ 提交中击败了93.23%的用户

内存消耗：10.5 MB, 在所有 C++ 提交中击败了57.73%的用户

```c++
string convert(string s, int numRows) {
	vector<string> result(numRows);
	int row = 0, col = 0;
	bool shu = true;
	if (numRows == 1)
		return s;
	for (int i = 0; i < s.length(); ++i)
	{
		result[row].push_back(s[i]);
		if (shu)
		{
			if (row == numRows - 1)
			{
				shu = false;
				--row;
				++col;
			}
			else
				++row;
		}
		else
		{
			if (row == 0)
			{
				shu = true;
				++row;
			}
			else
			{
				--row;
				++col;
			}
		}
	}
	//顺序读取
	string ans;
	for (int i = 0; i < numRows; ++i)
		ans += result[i];
	return ans;
}
```



### 23 合并K组升序链表

1.采用K路归并的思路

时间复杂度：O（nk)

执行用时：756 ms, 在所有 C++ 提交中击败了7.77%的用户

内存消耗：12.6 MB, 在所有 C++ 提交中击败了98.43%的用户

```c++
ListNode* mergeKLists(vector<ListNode*>& lists) {
        int n = lists.size();
        bool allZero = false;
        //N路归并
        ListNode* head = new ListNode();
        ListNode* ptr = head;
        while (!allZero)
        {
            int minNum = 99999;
            int index = -1;
            for (int i = 0; i < n; ++i)
            {
                if (lists[i] != nullptr&&lists[i]->val < minNum)
                {
                    index = i;
                    minNum = lists[i]->val;
                }
            }
            //找到最小的了
            if (index == -1)
                allZero = true;
            else
            {
                ptr->next = lists[index];
                ptr = ptr->next;
                lists[index] = lists[index]->next;
            }
        }
        return head->next;
    }
```



2.采用二路归并的思路

时间复杂度：O（NlogK)

执行用时：20 ms, 在所有 C++ 提交中击败了99.49%的用户

内存消耗：22.2 MB, 在所有 C++ 提交中击败了13.34%的用户

```c++
//归并从下标start开始的n个链表
ListNode* merge2Lists(vector<ListNode*>& lists, int start,int n) {
	if (n == 0)
		return nullptr;
	if (n == 1)
		return lists[start];
	ListNode* p1 = merge2Lists(lists, start, n / 2);
	ListNode* p2 = merge2Lists(lists, start + n / 2, n - (n / 2));
	//对p1和p2进行归并
	ListNode* head = new ListNode();
	ListNode* ptr = head;
	while (p1 != nullptr&&p2 != nullptr) {
		if (p1->val < p2->val) {
			ptr->next = p1;
			p1 = p1->next;
			ptr = ptr->next;
		}
		else {
			ptr->next = p2;
			p2 = p2->next;
			ptr = ptr->next;
		}
	}
	while (p1 != nullptr) {
		ptr->next = p1;
		p1 = p1->next;
		ptr = ptr->next;
	}
	while (p2 != nullptr) {
		ptr->next = p2;
		p2 = p2->next;
		ptr = ptr->next;
	}
	return head->next;
}

ListNode* mergeKLists(vector<ListNode*>& lists) {
	return merge2Lists(lists, 0, lists.size());
}
```



### 最小水位

类似于最小生成树，使用优先级队列存储

时间复杂度：O（N²logK)

```c++
struct GridNode {
	int row;
	int col;
	int index;
	//const很重要!
	bool operator<(const GridNode& node)const {
		return this->index < node.index;
	}
	bool operator>(const GridNode& node)const {
		return this->index > node.index;
	}

	GridNode(int r, int c, int i) :row(r), col(c), index(i) {};
	GridNode() {};
};

int swimInWater(vector<vector<int>>& grid) {
	priority_queue<GridNode,vector<GridNode>,greater<GridNode>> q;
	int n = grid.size();

	//初始化
	int minshuiwei = grid[0][0];
	grid[0][0] = -1;
	q.push(GridNode(0, 1, grid[0][1]));
	q.push(GridNode(1, 0, grid[1][0]));
	while (grid[n - 1][n - 1] != -1) {
		//找出当前最小的水位
		GridNode temp = q.top();
		q.pop();
		grid[temp.row][temp.col] = -1;
		if (temp.index > minshuiwei) {
			minshuiwei = temp.index;
		}
		//加入其上下左右
		if (temp.row != 0 && grid[temp.row - 1][temp.col] != -1) {
			q.push(GridNode(temp.row - 1, temp.col, grid[temp.row - 1][temp.col]));
		}
		if (temp.col != 0 && grid[temp.row][temp.col - 1] != -1) {
			q.push(GridNode(temp.row, temp.col - 1, grid[temp.row][temp.col - 1]));
		}
		if (temp.row != n - 1 && grid[temp.row + 1][temp.col] != -1) {
			q.push(GridNode(temp.row + 1, temp.col, grid[temp.row + 1][temp.col]));
		}
		if (temp.col != n - 1 && grid[temp.row][temp.col + 1] != -1) {
			q.push(GridNode(temp.row, temp.col + 1, grid[temp.row][temp.col + 1]));
		}

	}
	return minshuiwei;
}
```

