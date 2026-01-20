---
title: "The Story of Tic Tac Done"
date: 2023-05-31T14:39:57+03:00
draft: false
---

<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 0.381 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Wed May 31 2023 04:42:00 GMT-0700 (PDT)
* Source doc: The story of tic tac done
----->


I have a history with failed projects. My “websites” folder is more like a graveyard than a portfolio, it's filled with things I was once enthusiastic about but decided to abandon. One day, I decided that this won’t happen again, and it almost didn’t! But nowI’m face to face with yet another abandoned project. This time it's called _tic-tac-done_.


## What was tic tac done?

Over the last month, I've been working on an app that I hoped would fix my annoyances with others, as well as  bring something new to the table. A todo list app that included the things i loved from all the todo list apps that I’ve used before, and then some. I called this app “tic tac done”.

I wanted tic-tac-done to be both a to-do list app and a calendar (like google calendar). It would let you create separate to-do lists (like Google tasks). It wouldn’t have subtasks (like GNOME endeavour). It would look nice and modern (like all of them). And finally, it would have a special feature: what I call time blobbing!

What is time blabbing? Imagine you have a lot of tasks to get done, and you don’t want any single one taking up too much time, so you set a timer for the max time each task could take. They could end sooner, but they can't take longer. 

I already use this framework, but having to open a separate timer app is a bit annoying, so I want to integrate it right into the todo app itself. My idea is that (from inside the app) you add tasks to your “focus group” and then set a max time for each. Lastly, you click start and the timers of each task would start firing one after the other automatically.

Like every project before it, tic-tac-done was a great learning opportunity. I did a lot of things right when making the app, but also committed mistakes that made me end the project. I believe that the story of tic-tac-done is not only good for me having learnt how to (and not to) make an app, but also may reveal insightful truths about the nature of software.


## What i did right

Compared to my previous projects, many things I did right while trying to develop tic-tac-done. 


### A clear goal

Before starting, I sat down and determined what exactly am I gonna be making. I had a list of features and descriptions of those features. I had a clear goal. This meant I could at any time know how far along the project I am, and how much left is there to do. That let me stay focused on what I wanted to build and not get carried away with something I didn't care much about.


### Using a UI library

What this means is that I didn't design or choose the look of my app, but was provided with a bunch of guidelines to follow. I didn't even have to spend mental effort thinking about what goes where.

This is good as it let me focus on making the app function the best it could, while having it look better than anything I would've designed myself, so I could get the app launched faster. By using a prebuilt UI library I overcame my insistence that “my thing must be unique”, and focused on more practical matters, while almost making zero sacrifices.


### Researching

A todo list app can be very minimal: A list of sentences that go away when you click them, but I wanted more! For example, each task had a date. This meant that I had to learn how to work with dates which I had not done before.

Moreover, the UI library was telling me to write my code a certain way which I did not understand, so I also had to research that. 

A lot of research was done during the development of tic-tac-done. This was good. Instead of guessing stuff that would temporarly work then cause bigger problems leter on, I allowed myself to dive deep into a topic and with this rich understanding do things right!


## Why it failed

I encountered many technical issues related to the organisation of my code. I made mistakes early on that grew into bigger problems. Things like shared mutable state, not adhering to a proper paradigm, not using an abstraction over the js data API, etc… These are all things you probably don’t understand, and that doesn’t really matter, because these problems are not the main reason the project failed. 

All these things could have been fixed given time. In fact, I’m glad they happened because now I know to take them more seriously. However, they made me pause for a second and look at the bigger picture. **It really didn’t make sense for me to be building this app**. There are a thousand todo apps out there that would work better than mine. The thing I was building was useless, thus continuing to develop it is like flushing time down the toilet.


## What i’ve learnt

Trying to build this app taught me two things: 



* **The danger of technical debt: **Technical debt just means those bad decisions that I made early on when I said “this is a small project. I don’t have to be organised!”. I learnt that almost no app is too small, and this type of laziness will come back to bite me later.
* **Building apps that do one thing and do it very well: **if I had just focused on making an app that let me do time blobbing (the one thing I wanted), I would have gotten the app done quicker with fewer bugs, and in the end had a use for it. The main reason I wanted to build this app is to have time blobbing integrated inside the app, but I never even got to start working on that feature. So that feature list I was so happy about at the start, it needs to be shorter.


## So, what am I gonna do?

I’m gonna build a new app! It’s gonna be just for time blobbing. I’ll be able to share tasks to it (for integration with my google tasks), but that’s the only extra feature. I will use the same UI library to get things done quickly while having them look nice, and stick to organised well structured code from the start. See you then!

Ps: i don’t have a name for the new app so you can suggest one [here](mailto:mohsenelsisi36@gmail.com).

