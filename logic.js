var topics = [];


  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript">
    // Example queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  </script>

