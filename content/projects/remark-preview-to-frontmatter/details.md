`remark-preview-to-frontmatter` is a package and I developed which extracts a snippet from the top of a markdown file and adds it as a property in the frontmatter yaml. Specificallly, it is a `remark` plugin. the package is freely available on npm.

As explained in the associated blog post, developing this package taught me:

1. How to prepare an npm package for publishing and making it available on npm
2. End to end testing a node application using `node:test`
3. Writing a public API that's meant to be used by other developers, including extensive configuration.
4. Writing documentation for a public package/API
