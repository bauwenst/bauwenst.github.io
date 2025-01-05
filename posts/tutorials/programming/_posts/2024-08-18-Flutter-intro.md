---
layout: post

title: Quick overview of mobile app development with Flutter
description: Cross-platform app development is surprisingly easy in 2024. Learnt it in a weekend.

tags: [Dart, Flutter]
# TODO: Speak about routing.
---

Knowing how to build mobile apps is likely going to be a skill that will stay relevant for the foreseeable future. I've had some ideas for mobile apps in the past, and wanted to make sure that if I was going to learn to develop them, it had better be in a framework that allows having one code base and yet runs on both iOS and Android. We're in luck: Google's Flutter framework, built on top of the Dart language, does exactly that. Here are my notes learning it.

1. dummy
{:toc}

# The Dart language
## Syntax
Dart looks a lot like Java, so just learn Java. It has a couple of user-friendliness improvements over Java:
- Keyword arguments are a thing and hence you can pass them in any order. This is very useful given the deeply nested constructor calls you will be making. [Java does not have keyword arguments](https://stackoverflow.com/questions/1988016/named-parameter-idiom-in-java), which you don't realise because your IDE puts a comment next to argument values.
- Doesn't require the `new` keyword to call a constructor.
- No `public` and `private` bikeshedding.
- Comes with an actual package manager, called [Pub](https://pub.dev/).
- Asynchronicity (see below).

You'll see examples of Dart below, so you can compare to Java.

## Flutter
Flutter is a Dart package that provides a bunch of UI abstractions that are compilable to not only iOS and Android, but also to a [browser app](https://en.wikipedia.org/wiki/Single-page_application) or even a Windows, MacOS or Linux binary. It is entirely object-oriented, and it uses tricks to avoid having to re-build the entire application from scratch after you make tiny changes to the code.

Here's a hello-world example app in Flutter:
```dart
import "package:flutter/material.dart";

void main() {
    runApp(HelloWorld());
}

class HelloWorld extends StatelessWidget {

    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            home: Text("Hello world!"),
        );
    }
}
```
I'll explain more about widgets soon.

## Asynchronicity
Dart steals its support for asynchronous behaviour from JavaScript, with both an `await` and `async` keyword.

An *asynchronous* or *non-blocking* statement is one that is by default not waited for before it finishes. That means you could be executing the lines of code that come after an asynchronous line and have it finish after them. This is useful when you don't want your app to freeze while doing a network or disk request, and you also don't want to be managing threads yourself.[^1]

You use `async` to make a function or method asynchronous, meaning its *users* (which says nothing about its *implementation*) execute it by passing over it and, when it finishes, handing the result to a pre-specified function. That means that the result of an asynchronous function is out of scope for the context that calls it, and cannot be assigned to a variable. For example:
```dart
int printLater() async {
    print("...I'm late.");
    return 69;
}

void consume(int x) {
    print(x);
}

void main() {
    printLater().then((result) => consume(result));
    print("I'm early!")
}
```
A function marked `async` doesn't need to contain any asynchronous statements; all that says is "it's fine to continue executing before this call has returned". In fact, even if a function contains asynchronous statements in its body, it doesn't have to be marked `async`. That's because the result of calling an `async` function is a wrapper object (a `Future` in Dart, commonly called a `Promise` elsewhere) which can be passed around immediately after the call, like any other object (although it's of little use). The part that's asynchronous is not the function *call*, but the function *execution*: it's hence not so much that you pass *over* a call to an `async` function, but more like it gives you a dummy reference pointing to data that is still maturing in the background.

A function *is* required to be marked `async` when it wants to "unpack" the wrapper returned after itself calling an `async` function, in order to get the unwrapped value in-scope. Obviously, for there to be anything to unpack, the execution of the called `async` function must have completed. If not, we are forced to wait for this to happen. You can put a pause in your code with the `await` operator:
```dart
int printLater() async {
    print("...I used to be late.");
    return 69;
}

void main() async {
    int result = await printLater();
    print("I'm no longer early!")
}
```
It is slightly unintuitive that a function would be `async` for having made the asynchronous statements synchronous. After the `await` in the above `main()` function, there is no more asynchronicity and we can pretend like `result` came from any other blocking function. If you need more intuition about this, I recommend reading [this post](https://stackoverflow.com/a/56895719).

Most fundamentally, it [begs the question](https://stackoverflow.com/q/55250378/9352077): does using *even just one* `async` function deep down in your code result in a chain reaction of needing `async`s all the way to the top of the callstack? No, because at some point, it will be acceptable for an asynchronous call not to finish before the code that follows it, which means you can keep the `Future` for later unpacking (with all functions that don't unpack avoiding being marked as `async`) or throw it away if you only care about side-effects (e.g. prints). If you do need to use the value of the `Future` at some point, that will either be in-scope (temporarily causing `await`s and `async`s to appear), or it will be acceptable to let the result be handled out of scope with a `.then(function)` where `function` has no obligation to be marked `async` (because a function is not responsible for knowing where its arguments came from, and hence doesn't know if the arguments were awaited).

# Development environment
The gods have graced us with JetBrains support for Flutter development. You can just install the Flutter plugin for IntelliJ IDEA, add an Android emulator, and you're good to go. Flutter's widgets work in such a way that when you make changes to the app while the emulator is already running, you can do a "hot reload" whereby the app keeps running and only the parts you changed take effect.

One thing you will want to change is the indentation. By default, it's fixed at 2 spaces with no configurability. Why? Because the formatter, [`dart_style`](https://github.com/dart-lang/dart_style), is maintained by an [autistic powertripper](https://github.com/dart-lang/dart_style/issues/534). Luckily, there is a free IntelliJ plugin, [DartFormat](https://plugins.jetbrains.com/plugin/21003-dartformat), that gives you all the configurability you need.

# Flutter widgets
The Dart classes provided by Flutter define the user interface with a hierarchy of *widget* instances, much like a web page is a hierarchy of HTML tags, except Flutter widgets make a lot more sense in how they stretch to accomodate the space they're given on the screen. 

As long as a widget doesn't change, it only needs to be compiled once. A widget can change in two ways: the developer can change the code that defines it, or some variable that determines what the widget looks like changes. Widgets for which the latter is true are *stateful*, and all other widgets are *stateless*, represented by the two classes `StatefulWidget` and `StatelessWidget` that both inherit from the `Widget` class.

## Stateless widgets
A stateless widget extends the `StatelessWidget` class and has a `build()` method that returns the `Widget` tree it should be substituted with:
```dart
class YourWidget extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        ...
    }
}
```
These objects can have fields, but they must all be `final` because they can't change at runtime.

## Stateful widgets
A stateful widget splits the two responsibilities of a `StatelessWidget` into two classes instead of one: the first class is a widget that extends the `StatefulWidget` class, the second class is a state that extends the `State<YourWidget>` generic class and provides the `build()` method. They are linked by the generic, and by a method `createState()` on the first class that returns an instance of the second class.

```dart
class YourWidget extends StatefulWidget {
    @override
    State<YourWidget> createState() { return _YourWidgetState(); }
    // or, in shorthand: State<YourWidget> createState() => _YourWidgetState();
}

class _YourWidgetState extends State<YourWidget> {

    @override
    Widget build(BuildContext context) {
        ...
    }
}
```
Note that there are actually two "new" state classes involved here: we first [*invoke*](https://docs.oracle.com/javase/tutorial/java/generics/types.html#instantiation) the generic `State`'s type parameter by specifying a type argument `<YourWidget>`, and then we take this invoked type that is already specific to our application and we *extend* it to a subclass `_YourWidgetState` that is again specific to us.

The reason why your state subclass needs to know which widget class it belongs to (`<YourWidget>`) is because it has a field `this.widget` containing a reference to the widget instance that created the state. Since you as the developer construct widgets and not states, you pass arguments to the widget to initialise its fields, and the state's `build()` method can then access those via `this.widget` knowing its type. [This is also the reason why](https://stackoverflow.com/a/52067166/9352077) the state has an `initState()` method that is run *after* construction, so that you can use the information of the widget to finish configuring the state.

When the app is running and we change the state, the widget needs to be rebuilt to refresh what's shown on the screen. To notify the app that the state was changed (because nothing is notified of a variable assignment by default), you should call `setState(function)` and perform your changes inside that given function.

## List of widgets
The [widget catalogue](https://docs.flutter.dev/ui/widgets) lists all pre-defined widgets in Flutter. For basic apps, it suffices to know the [basic widgets](https://docs.flutter.dev/ui/widgets/basics) and the [layout widgets](https://docs.flutter.dev/ui/widgets/layout).

An overview of the basics:
- **Scaffold**: pre-defines a basic header-body-footer layout with support for floating buttons.
- **AppBar**: container that displays content and actions at the top of a screen.
- **Text**: text with a single style.
- **Column**: list of child widgets in the vertical direction.[^2]
- **Row**: list of child widgets in the horizontal direction.
- **Container**: combines common positioning and sizing widgets.
- **ElevatedButton**: filled button whose material elevates when pressed.
- **Icon**: an icon.
- **Image**: an image, either from the web or from the pre-declared assets.

Extra layout widgets:
- **Center**: centers its child horizontally and vertically in the parent widget.
- **Expanded**: sizes a child of a `Row` or `Column` to the edges of that parent. Ironically, comes in handy when an image is too big and you want to shrink it.
- **Padding**: moves its child away from its edge by a given amount of space.
- **SizedBox**: box with a specified size. Can be used for adding fixed space in a list of widgets or to force a child into a specific width and/or height.

Whereas sizing and spacing are a nightmare in HTML (try [centering a `<div>`](https://www.joshwcomeau.com/css/center-a-div/)), it works intuitively in Flutter.

## Design framework widgets
There are two special stateless widget classes of which at most one is supposed to appear in your widget tree, and exactly one instance of it. These widgets will define the overall theme of the app, and may connect widgets to hyperlinks so they form a network to navigate. One is called `MaterialApp`, the other is called `CupertinoApp`: they respectively define apps that *look like* an Android app (following the guidelines of Google's "Material Design") and *look like* an iOS app (following the guidlines of Apple's in-house style), [with emphasis on *looks*](https://stackoverflow.com/q/61674954/9352077) because Flutter compiles to any platform.

To run a Flutter app, you execute a function `runApp(widget)` where the widget can be any widget you want. Best practice is to have that widget *have a `build()` method that returns a `MaterialApp` or a `CupertinoApp`*. Note that this is **not** the same as that widget **being** one of those widgets nor being a subclass of them. It *returns* one of them.

## Navigation
Navigation between widgets, and looking up widgets based on URLs (a.k.a. *routing*), is a controversial topic in Flutter. Originally, navigation could only be done through stack operations: moving to a different widget would push it to the top of the widget stack, and moving back to the previous widget would pop the one at the top. This was all done using static methods on the `Navigator` class.

Yet, the philosophy of implementing a UI in Flutter is generally *declarative* as we have seen above, rather than imperative like a stack interface. (The only declarative part about this stack system was that named paths would be declared in the constructor of `MaterialApp`.) So, in an attempt at making navigation more like the rest of Flutter, it is now possible to build the page stack like you would build any other list of child widgets. However, this approach has a bad reputation for being way overcomplicated, so for simple apps, best not delve into it.

I won't go into further detail, but I highly recommend watching [this video](https://www.youtube.com/watch?v=b17bmcRpSuU) that shows a simple example in the old and new navigation style, and [this video](https://www.youtube.com/watch?v=oskdrY1shV0) for what the new style looks like in practice. Background about the philosophies of the two styles is given in [this video](https://www.youtube.com/watch?v=rHbQD8ccM_g) and [this video](youtube.com/watch?v=sxo6IcPtsuw), both with their own examples.

## Example
Let's build an example Flutter app that includes a custom stateless and stateful widget. First, the widgets:
```dart
import 'package:flutter/material.dart';

class HomeWidget extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Scaffold(    // <--- "When you see HelloWorld, substitute it by the following Scaffold widget"
            appBar: AppBar(
                backgroundColor: Colors.blue,
                title: Text("Hello world!", style: TextStyle(color: Colors.white)),
            ),
            body: Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,     // Vertically centered stack of texts.
                    crossAxisAlignment: CrossAxisAlignment.center,  // Column takes up the entire horizontal space.
                    children: <Widget>[
                        Text(
                            "This is the centre of the page.",
                            style: TextStyle(
                                color: Colors.blue,
                                fontWeight: FontWeight.bold,
                            ),
                        ),
                        SizedBox(height: 8.0),
                        Text(
                            "Bottom text.",
                            style: TextStyle(
                                backgroundColor: Colors.amber,
                            ),
                        ),
                        SizedBox(height: 8.0),
                        ButtonWithCounter(start: 0, increment: 1)
                    ],
                ),
            ),
        );
    }
}


class ButtonWithCounter extends StatefulWidget {

    int start = 0;
    int increment = 1;

    ButtonWithCounter({required int start, required int increment, super.key}) {
        this.start = start;
        this.increment = increment;
    }

    @override
    State<ButtonWithCounter> createState() => _ButtonWithCounterState();
}


class _ButtonWithCounterState extends State<ButtonWithCounter> {

    int current = 0;

    @override
    void initState() {
        super.initState();
        this.current = this.widget.start;
    }

    void press() {
        this.setState(() {
            this.current += this.widget.increment;
        });
    }

    @override
    Widget build(BuildContext context) {
        return TextButton.icon(
            icon: Icon(Icons.add),
            label: Text("Count is ${this.current}"),
            onPressed: this.press
        );
    }
}
```
Note that because `build()` returns any subclass of `Widget`, and because all widgets with a `child` also accept any subclass of `Widget`, statefulness does *not* propagate up the tree (unlike `async`/`await` in the function callstack).[^3]

Now that we have the widget tree defined, we surround it by a `MaterialApp` and run it.
```dart
class ExampleApp extends StatelessWidget {
    ExampleApp({super.key});

    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            title: 'Flutter Demo',
            home: HomeWidget(),
        );
    }
}

void main() {
    runApp(ExampleApp())
}
```
As mentioned above, the developer can "hot reload" the app when working on it, and not only will Flutter do minimal recompilation, but it will also keep state. In this case: note that we instantiated our stateful button as `ButtonWithCounter(start: 0, increment: 1)`. If we click the button 5 times, then change that `1` to a `2`, and then do a hot reload, the count will not change yet clicking the button will make the counter go up by 2, showing that the button widget has changed whilst the state hasn't. Granted, this does not guarantee that the current state is desirable: you could never reach a count of 5 if you started from 0 and incremented in steps of 2, and yet the app is in that state after the hot reload.

# Conclusion
I really like that Flutter is platform-independent, since it makes app development much more accessible to a one-man team. I learnt the above in one weekend. Hopefully you learnt something too. Now, let's get to building some apps to make some money!



[^1]: Of course, JavaScript is notoriously single-threaded, and Dart is too.

[^2]: Note that this is the exact opposite of the `columns` environment in $$\LaTeX{}$$, which puts things side-by-side. In Flutter, `Column` and `Row` are called that because they represent *exactly one* column and exactly one row. If you look at a matrix, **one** column is a vertical sequence of elements, whilst the "sequence of column**s**" (the matrix itself) runs horizontally.

[^3]: On the same subject: note that despite taking a callback function as its argument, [`setState()` is *not* asynchronous](https://stackoverflow.com/q/51216448/9352077) because it is mostly a wrapper for "execute this code, then run `build()`" which also isn't asynchronous. That is: when you call `setState()` (in this case, `press()`), you have to wait for it to finish before moving to the next line of code. I suspect that this is not an issue considering that button presses are probably asynchronous themselves, meaning that tapping the button probably launches a function $$f$$ which is `async`, and somewhere inside that function you call the button's `onPressed` function which here calls `press()` which calls `setState` which executes the given callback and then calls `build()`. If this $$f$$ is `async`, the app does not wait for it to finish before listening to more button presses, even though the inside of $$f$$ consists of calls that do wait on each other to finish. I don't know if this is true, but it would make sense.
