---
title: "What Is Rss"
date: 2023-05-27T19:16:35+03:00
---

We consume a lot of digital media everyday. Written posts,  videos, podcasts and the such. We mostly access these through platforms like youtube for video, spotify for podcasts and the specific website for blog posts. Add to that email newsletters, reddit threads, and now stepping back and looking at it: keeping up to date with everything you want to is unreasonably difficult!


## The status quo is problematic

ignoring the problems that an algorithm deciding what you see causes, and the potential distractions you might suffer from trying to find insightful info on social media,leaves us with one issue: fragmentation.

I’m subscribed to several youtube channels, podcasts and email newsletters. Additionally there are blogs which I wanna see the articles they release regularly, but i know i'll forget to check them every once in a while or feel lazy about doing it. The media I consume is fragmented among different apps, websites, platforms etc… RSS turns out to be the perfect solution for this specific problem, so what even is RSS?


## What even is RSS?

RSS stands for "Really simple syndication", and it’s just a fancy protocol. The idea is each source of media on the internet you wanna be up to date with, you subscribe to their _rss feed_. And then when you have spare time, instead of opening up multiple apps and websites, you only open your _RSS reader, _and BOOM. All the content you like is in one place for easy consumption.


## The technical details (skip if you're not in to tech stuff)

To implement an RSS feed yourself, all you need is a simple XML file that contains `<rss>` as the root. Within this element there is also a `<channel>` element. This channel element contains a `title, link, description` and `image` elements, which are all self-explanatory.

The canal element also contains `<item>` elements, which are the individual items in the feed. An item contains `title, description, link` and `pubDate`.. in the end your XML file should look a bit like this:

```xml

<rss>

    <channel>

   	 <title>Marvellous manuscripts</title>

   	 <link>https://example.com</link>

   	 <description>lorem ipsum</description>

   	 

   	 <item>

   		 <title>firction</title>

   		 <link>https://example.com/friction</link>

   		 <description>lorem ipsum</description>

   		 <pubDate>3 June 2007</pubDate>

   	 </item>

   	 

   	 <item>

   		 <title>friction part 2</title>

   		 <link>https://example.com/friction-2</link>

   		 <description>lorem ipsum</description>

   		 <pubDate>4 June 2007</pubDate>

   	 </item>

    </channel>

</rss>

```

To obtain the content within an item of an `item` element, simply make an http get request to the url specified inside the `link` element

## it's not all rainbows and sunshine

I love RSS, but I do admit it does have its downsides. Since you only see things you previously subscribed to, you lose the ability to discover new people and content creators. on Youtube a video from a novel youtubes may be shown as a suggestion, but you can't get that on RSS. You can still discover people if they are mentioned by people you are already subscribed to.


## getting started with RSS

To use RSS, you will first need an _RSS reader_. An Rss reader is an app  where you can view and manage your RSS feeds. You can google “rss readers”, then pick one you like. You can subscribe to an RSS feed by simply copying a URL that is similar to an RSS feed, and pasting it into your RSS reader.

So, how do you get your hands on a URL to an RSS feed? For youtube channels, it’s just the URL to the youtube channel you want. For blogs, a lot of them if you scroll to the bottom will have the link waiting for you, or it’ll be hidden behind an RSS logo (look like a wifi sign laying on it’s side. Look it up).

Things like newsletters don’t have RSS feeds, but there’s this super cool website called [kill the newsletter](https://kill-the-newsletter.com) that lets you turn any newsletter to an RSS feed. There are other services like that which work for various social media websites that you can discover yourself. 


## Conclusion

The content we consume is scattered among a million places. RSS can be used to gather all the things you like from these many places into one app where you can enjoy them all. There are RSS feeds for blogs, youtube channels, podcasts and through third party services email newsletter and social media. In short, RSS can solve the fragmentation of content we all have to deal with!

---

## sources

- [stop using social media for news, rss is much better](https://www.youtube.com/watch?v=_7LTwnAaQ3k&pp=ygUYcnNzIHRoZSBsaW51eCBleHBlcmFtZW50), by the linux experament.
