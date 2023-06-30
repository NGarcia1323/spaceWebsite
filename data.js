fetch('https://api.nasa.gov/') //key BHjMJOB3xoB3rqfMEAjHFuachbwBNaNV82KYux9W
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process the returned data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });
