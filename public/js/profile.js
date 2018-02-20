
function checkLoginStatus(signedIn) {
  //not signed in; set attribute to open in pop up instead of new page
  if (!signedIn) {
    $(".profile").attr({
      "data-toggle": "modal",
      "data-target": "#profile_popup",
    });
  }

  $(".profile").attr("href", "/profile");
}
