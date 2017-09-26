/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.controller('MainCtrl', function ($scope,Portfolios,$timeout,Contact) {
    console.log('i m working')
      Portfolios.all().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
            $scope.portfolio={};
            $scope.portfolio=res;
           // console.log(res);                  
        }
    });
   
    // submit contact form
    $scope.post ={} 
    $scope.addContact = function() {
        console.log(this.post)
        $scope.newPost = {};
        $scope.newPost.name = this.post.name;
        $scope.newPost.email = this.post.email;
        $scope.newPost.phone = this.post.phone;
        $scope.newPost.budget = this.post.budget;
        $scope.newPost.message = this.post.message;

        Contact.add($scope.newPost).then(function(res) {
            console.log(res);
            $scope.success_msg = "Thanks for contacting us, We will be get back to you soon!"
        });
        $scope.post = {};
    };
$timeout(function() {
    //       / setTimeout(tinymce.init({ selector:'#description' }), 3000); 
                    var slideIndex = 0;
                    showSlides();
                    function showSlides() {
                        var i;
                        var slides = document.getElementsByClassName("mySlides");
                        
                        var dots = document.getElementsByClassName("dot");
                        for (i = 0; i < slides.length; i++) {
                            slides[i].style.display = "none";
                        }
                        slideIndex++;
                        if (slideIndex > slides.length) {
                            slideIndex = 1
                        }
                        for (i = 0; i < dots.length; i++) {
                            dots[i].className = dots[i].className.replace(" active", "");
                        }
                            slides[slideIndex - 1].style.display = "block";
                            dots[slideIndex - 1].className += " active";
                        
                        setTimeout(showSlides, 3000);
    
                    }
    
                }, 0.500)

  })
    