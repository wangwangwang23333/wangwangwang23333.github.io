---
title: JS——原型链
date: 2022-4-03 18:00:00
description: 有关Js原型链的一些知识。
cover: https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403162850136.png
---



## 前言

在学习JS中的原型，原型链，继承这些知识之前，我们先学习下基础知识：**函数和对象的关系**。

我们一直都知道，函数也是对象的一种，因为通过` instanceof `就可以判断出来。但是函数和对象的关系并不是简单的包含和被包含的关系，这两者之间的关系还是有点复杂的。接下来我们就来捋一捋。

首先，阐述一点，**对象都是通过函数创建的**。
对于下面这种类型的代码，一般叫做“语法糖”：

```javascript
var obj = {a:10,b:20};
var arr = [5, 'x', true];
```

但是，其实上面这段代码的实质是下面这样的：

```javascript
var obj = new Object();
obj.a = 10;
obj.b = 20;

var arr = new Array();
arr[0] = 5;
arr[1] = 'x';
arr[2] = true;
```

而`Object`和`Array`都是函数，可以自己用`typeof`函数进行验证。

所以，可以得出：**对象都是通过函数创建的**。

那么下面就进入正题。

## 原型prototype

在前言中，我们说了函数也是一种对象，所以函数也是属性的集合，同时，也可以对函数进行自定义属性。
**每个函数都有一个属性——prototype。这个prototype的属性值是一个对象（属性的集合），默认只有一个叫做constructor的属性，指向这个函数本身。** 如下图所示：

![image-20220403154221307](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403154221307.png)

上图中，`SuperType`是一个函数，右侧的方框就是**它的原型**。

原型既然作为对象（属性的集合），除了`constructor`外，还可以自定义许多属性，比如下面这样的：

![image-20220403154324885](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403154324885.png)

当然了，我们也可以在自己定义的方法的`prototype`中增加我们自己的属性，比如像下面这样的：

```javascript
function Fn() { }
Fn.prototype.name = '张三';
Fn.prototype.getAge = function () {
    return 12;
};
var a = new Fn();
```

![image-20220403154612542](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403154612542.png)

Fn就是下面这样：

![image-20220403154633724](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403154633724.png)

那么问题来了：函数的`prototype`到底有何用呢？

在解决这个问题之前，我们还是先来看下另一个让人迷糊的属性：`__proto__`

## 隐式原型  _ proto_

先看一段非常常见的代码：

```javascript
function Fn() { }
Fn.prototype.name = '张三';
Fn.prototype.getAge = function () {
    return 12;
};
var fn = new Fn();
console.log(fn.name);
console.log(fn.getAge());
```

即，Fn是一个函数，fn对象是从Fn函数new出来的，这样fn对象就可以调用Fn.prototype中的属性。

但是，因为每个对象都有一个隐藏的属性——` __proto__`，这个属性引用了**创建这个对象的函数的prototype**。即：` fn._proto_ === Fn.prototype `
那么，这里的`__proto__`到底是什么呢？

其实，这个`__proto__`是一个隐藏的属性，javascript不希望开发者用到这个属性值，有的低版本浏览器甚至不支持这个属性值。

```javascript
var obj = {};
console.log(obj.__proto__);
```

![image-20220403160024050](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403160024050.png)




```javascript
console.log(Object.prototype);
```

![image-20220403160148483](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403160148483.png)



从上面来看，`obj.__proto__`和`Object.prototype`的属性一样！为什么呢？

原因是：obj这个对象本质上是被Object函数创建的，因此obj.**\_\_proto__**=== Object.prototype。我们可以用一个图来表示。

<img src='https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403160408070.png' width="50%">

即，**每个对象都有一个\_\_proto__属性，指向创建该对象的函数的prototype。**

> **说一下自定义函数的prototype：**
> 自定义函数的`prototype`本质上就是和 `var obj = {}` 是一样的，都是被`Object`创建，所以它的`__proto__`指向的就是`Object.prototype`。

但是，**`Object.prototype`确实一个特例——它的`__proto__`指向的是`null`**。

<img src='https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403161118789.png' width="50%">

另外一个问题：函数也是一种对象，函数也有`__proto__`吗？
答：当然也不例外啦！
下面用一段代码和一张图来说明这个问题，看完相信就有个比较直观的理解啦！

```javascript
function fn(x, y) {
    return x+y;
}
console.log(fn(10,20));

// 以下只是为了演示函数被Function创建的
var fn1 = new Function("x","y","return x+y;");
console.log(fn1(5,6));
```

用图表示就是：

<img src='https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403161731562.png' width="60%">

从上图可以看出：自定义函数`Foo.__proto__`指向`Function.prototype`，`Object.__proto__`指向`Function.prototype`。

但是，为什么有`Function.__proto__`指向`Function.prototype`呢？

其实原因很简单：**`Function`也是一个函数，函数是一种对象，也有`__proto__`属性。既然是函数，那么它一定是被`Function`创建。所以`Function`是被自身创建的。所以它的`__proto__`指向了自身的`Prototype`**

最后一个问题：`Function.prototype`指向的对象，它的`__proto__`是不是也指向`Object.prototype`？

答案是肯定的。因为`Function.prototype`指向的对象也是一个普通的被`Object`创建的对象，所以也遵循基本的规则。如下图：

<img src='https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403162506341.png' width="50%">

说了这么多，我们将上面这些图片整合到一整个图片，便于整体理解，图片如下：

<img src='https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403162639383.png' width="50%">

## instanceof

主要是说明下`instanceof`的判断规则是如何进行的。先看如下代码和图片：

```javascript
function Foo() {
}
var f1 = new Foo();

console.log(f1 instanceof Foo);//true
console.log(f1 instanceof Object);// true
```

<img src='https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403162850136.png' width="50%">

`instanceof`的判断规则为：
假设`instanceof`运算符的第一个变量是一个对象，暂时称为A；第二个变量一般是一个函数，暂时称为B。

`instanceof`的判断规则是：沿着A的`__proto__`这条线来找，同时沿着B的`prototype`这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回`true`。如果找到终点还未重合，则返回`false`。

结合这个判断规则，上面的代码和图示相信很容易看懂了。

## 原型继承

首先说一下什么是原型链：
**访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着\_proto_这条链向上找，这就是原型链**。

举一个例子说明下吧：
在实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？
答案就是：`hasOwnProperty`这个函数，特别是在for…in…循环中，一定要注意。

![image-20220403174502374](https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403174502374.png)

但是，`f1`本身并没有`hasOwnProperty`这个方法，那是从哪里来的呢？答案很简单，是从`Object.prototype`中来的。看下图：

<img src='https://wwwtypora.oss-cn-shanghai.aliyuncs.com/image-20220403174630283.png' width='70%'>

对象的原型链是沿着`__proto__`这条线走的，因此在查找`f1.hasOwnProperty`属性时，就会顺着原型链一直查找到`Object.prototype`。

由于所有对象的原型链都会找到`Object.prototype`，因此所有对象都会有`Object.prototype`的方法。这就是所谓的“继承”。

## 示例

> 下面这段代码的输出：
>
> ```javascript
> function Setcount(count){
> 	this.count=count
> }
> 
> Setcount.prototype.printCount=function(){
> 	console.log(this.count)
> }
> 
> let a = new Setcount(100)
> a.count =200
> a.__proto__.count=300
> a.__proto__.printCount()
> a.printCount()
> ```
>
> 结果为300和200。



> 下面这段代码的输出：
>
> ```javascript
> Object.prototype.foo = 'Object';
> Function.prototype.foo = 'Function';
> function Animal () {};
> var cat = new Animal();
> console.log(cat.foo);
> console.log(Animal.foo);
> ```
>
> 输出为Object 和 Function
