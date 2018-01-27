# Erridiom

As a result of low budget constrainsts and sloppy development the world is plagued with bad software. Good UX and UI are key to preventing users from making catastrophic mistakes when using critical systems. This is exemplified by the recent Hawaii UX incident.

Erridiom is a task/data based procedural UI generator for helping users to adopt defensive software usage strategies. Users are presented with a UI that they have never seen before and are given a task to complete. While completing their task, users must interact with UI idioms that can easily cause mistakes. A list of these erridioms is enumerated below (In README.md). Mistakes made by the user will cause large setbacks in their current task and will hopefully help users to learn how to avoid these common bad UI instances.

## List of common erridioms
- Right before a user clicks a button, an ad appears causing the GUI to shift and the user to click something they did not intend to click
- The user can configure the application to display more data than the maximum amount of data that can be rendered causing the application to crash
- The user is prompted with Apply/Cancel/Finish/Close(X) buttons but pressing apply and the close will revert the changes
- The application supports undo/redo, but only for a single action
- The user must drag and drop an item, but if they drop the item in an invalid region the item will be deleted
- Actions the user has made are irreverisble
- The application has session timeouts while the user is using the application. Session timeouts result in data loss.
- Pressing Undo, Going back a step, or navigation will delete what the user did in the present
- Default values are dangerous
