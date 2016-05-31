## How to contribute to Alertify

#### **Did you find a bug?**

* **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/alertifyjs/alertify.js/issues).

* If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/alertifyjs/alertify.js/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

#### **Did you write a patch that fixes a bug?**

* Open a new GitHub pull request with the patch. Use the [develop branch](https://github.com/alertifyjs/alertify.js/tree/develop), not the master branch.

* Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

* Before submitting, ensure that there are tests for any new functionality, and that all tests (including coding style tests) are passing

#### **Do you intend to add a new feature or change an existing one?**

* Suggest your change by opening an [new issue](https://github.com/alertifyjs/alertify.js/issues/new). If the response is positive start writing code.

#### Development Process

* To update the stylesheet, make changes to the [src/sass/alertify.scss](https://github.com/alertifyjs/alertify.js/tree/master/src/sass/alertify.scss) file

* To update the core javascript, make changes to the [src/js/alertify.js](https://github.com/alertifyjs/alertify.js/tree/master/src/js/alertify.js) file.

* Keep in mind the style guide as defined in the ESLint file, as PRs are automatically tested for code style.

* Don't include minified resources - anything in the [dist](https://github.com/alertifyjs/alertify.js/tree/master/dist) directory. Team members will
rebuild all those files for added security. If you do include changes by accident that's fine. We'll just overwrite them to be sure.

#### **Do you want to contribute to the documentation?**

* The documentation is found in the [website](https://github.com/alertifyjs/alertify.js/tree/master/website) directory. Edit it in there and send a PR.

Alertify is a community effort. We encourage you to pitch in and join the team!

Thanks!

Alertify Team
