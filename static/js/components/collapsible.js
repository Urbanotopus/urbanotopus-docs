$(function () {
  const CONTAINER_OPENED_CLASS = 'collapsible-opened';
  const COLLAPSED_CLASS = 'd-none';

  const COLLAPSIBLE_CONTAINERS = $('.collapsible');
  const COLLAPSIBLES_CONTENT = $('.collapsible-child');

  COLLAPSIBLE_CONTAINERS.on('click', function (e) {
    let container = $(e.currentTarget);
    let isCollapsibleOpen = container.hasClass(CONTAINER_OPENED_CLASS);

    // close all collapsibles
    COLLAPSIBLE_CONTAINERS.removeClass(CONTAINER_OPENED_CLASS);
    COLLAPSIBLES_CONTENT.addClass(COLLAPSED_CLASS);

    if (!isCollapsibleOpen) {
      let taskID = container.data('target');
      let toBeCollapsed = $(document.getElementById(taskID));

      // mark the container as opened
      container.addClass(CONTAINER_OPENED_CLASS);

      // show the hidden content
      toBeCollapsed.removeClass(COLLAPSED_CLASS);
    }
  });
});
