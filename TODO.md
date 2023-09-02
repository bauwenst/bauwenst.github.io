# TODO
- The category path of a post is displayed above and below the title. Below, each part p links to /categories/p.
  Above, however, each part just leads to the path truncated to that part. I need a way to redirect these automatically.
  For example: /posts/papers should redirect to /categories/papers or (if you want to keep hierarchy) /categories/posts/papers.
  The problem is, I guess, that in config.yml, the path for a category only has access to its `:name` without the parents. This might
  be the reason why [Lazy Ren only goes one category deep](https://lazyren.github.io/devlog/).
  [Hydejack's website technically has deeper paths](https://hydejack.com/blog/hydejack/2019-02-18-improving-site-build-speed/) 
  by just manually adding a page for each category, but notice that it still doesn't have nested categories. Instead, `/blog/` is used
  as the endpoint for everything post-related, including category pages, meaning for a category `c`, you *know* which endpoint it will
  be at in the config.yml: `/blog/:name`.
    - I find it strange that Hydejack clearly has nested categories built in (which is why there is a ["category separator"](https://github.com/hydecorp/hydejack/blob/a1d06e63eca202a320f952c84e70b2ce6b55366e/_includes/components/post.html#L24)), yet the place where you define category paths,
    which is in config.yml as a *collection*, you only have a `:name`.
    - I guess we should figure out if `:name` is really the only thing we have.
    - To be fair, the only reason I *need* nested categories is because of Jekyll's [unthinkably stupid category system](https://github.com/jekyll/jekyll/pull/2633#issuecomment-60811901) that indexes all Markdown files *below* `/_posts/`
      but assigns them to the folders *above* it as categories, rather than the subfolders of `/_posts/`. Hence, I have to choose between 1. having a bunch of top-level
      folders for a category of posts each, or 2. having one folder containing category folders, it itself identified as a category too.
    - If we drop the morbid curiosity of wanting to utilise the semi-supported nested categories, we could imitate the Hydejack website. I'm assuming it has one `/blog/` folder.
      Alternatively, we could use Lazy Ren's approach and just add `category: ...` to the header of each post.
    - Although, come to think of it, if I *really* will be using my personal website for a long time, then eventually I'll need nested categories.
      For example, `Tutorials/...`, `Academics/Publications` and `Academics/Papers` and so on.

- Add BibTeX citation to the footer of a post.

- Featured category aliasing is buggy.
    - A post shows its category path under the title. *Featured* categories, i.e. categories with a page in `_featured_categories`, are hyperlinked.
      Here's what's simultaneously good and bad: no matter what path the featured category is at, it is hyperlinked correctly.
    - Here's the issue: if there exists a featured category `example`, then in a post at `papers/example`, that category will still be linked.
    - The actual fix for this problem is simple: we don't want to use featured categories. 
          - We want all indexed `_posts`'s ancestors to be featured *automatically*.
            As to why: the current category `example` is actually also placed incorrectly, since it should actually be `posts/example`. This is an easy mistake to make
            because `_featured_categories` has to mirror `posts`.
          - URLs at the top of a page can then just be built with simple string logic rather than the smart but unhelpful random-access function.
          - I think breadcrumbs already did exactly that!
    - However, the compiler can only generate pages if there is an `md`/`html` for them.
        - Correction: the compiler generates pages under three circumstances:
            - `md` files under every `_posts` folder.
            - `md` files under every folder that is declared as a collection in the config. These have no path at the top.
            - Probably `index.html`, because `path/to/folder` returns the same as `path/to/folder/index.html`.
            - Possibly all `html` files (not sure though).
        - Adding an `index.html` file per subfolder seems like a good idea, as suggested here: https://stackoverflow.com/a/38860537/9352077.
            - The one question I have is whether we have access to an md's ancestor list. I think we do.

- On mobile, the path cuts off at the end, not the start. Should either scroll or cut off at the start.

- Remove "featured categories".

- Add a Hydejack table class (like .scroll-table) for centering a table, which seems impossible.

- Icons next to URLs somehow not working. Might be completely bricked up now that I have the not().

- The folder tree:
  - Should be restyled with some existing CSS class to turn nested ULs into file trees.
  - Needs hyperlinks.