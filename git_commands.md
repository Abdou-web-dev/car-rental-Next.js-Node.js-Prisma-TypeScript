git config --global url.https://github.com/.insteadOf git://github.com/

git remote set-url origin git@github.com:ahlemtbini/blog_web.git

git remote set-url origin https://github.com/Abdou-web-dev/car-rental-test.git

git config --global url.git://github.com/ .insteadOf https://github.com/


# git config --global url.https://github.com/.insteadOf git://github.com/: This command tells Git to use HTTPS instead of the git protocol (git://) when interacting with repositories hosted on GitHub.

It sounds like you identified the root cause of the issue correctly. Both of those commands modified your global Git configuration (git config --global) to specify different URL transformations. The second command did not replace the first; instead, both transformations were added to your .gitconfig file under the [url] section.

To clarify:

git config --global url.https://github.com/.insteadOf git://github.com/: This command tells Git to use HTTPS instead of the git protocol (git://) when interacting with repositories hosted on GitHub.

git config --global url.git://github.com/ .insteadOf https://github.com/: This command does the opposite, telling Git to use the git protocol (git://) instead of HTTPS when interacting with GitHub repositories.

When both of these transformations are present in your .gitconfig file, Git will apply them based on the order they are defined or the specificity of the URLs.

To resolve such issues in the future, ensure that your .gitconfig file only contains the transformations you intend to use. You can remove or comment out (#) the lines that you no longer need. This helps in maintaining a clear and consistent configuration for Git interactions.

If you're unsure about the current state of your .gitconfig file or if you've made multiple changes, reviewing and cleaning up unnecessary configurations can prevent similar issues from occurring again.