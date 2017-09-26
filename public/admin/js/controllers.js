/**
 * NavCtrl
 * @param {type} param1
 * @param {type} param2
 */
adminApp.controller('NavCtrl', function($scope, $state) {
    $scope.active = $state;
    $scope.isActive = function(viewLocation) {
        var active = (viewLocation === $state.current.name);
        return active;
    };
})
/*
* Dashboard controller
*/
adminApp.controller('dashboardCtrl', function($scope) {
    
});

/**
 * AllPostsCtrl
 */
adminApp.controller('AllPostsCtrl', function($scope,Posts,$location,$timeout,PagerService) {
    $scope.vm = {};
    Posts.all().then(function(data){
        $("#mydiv").hide();
        $scope.total_records = data.total;
        $scope.posts = data.posts;
        
        // paging start
        $scope.vm.dummyItems = $scope.total_records; // dummy array of items to be paged
       $scope.vm.pager = {};
       $scope.vm.setPage = setPage;
       initController();
    
       function initController() {
           // initialize to page 1
           $scope.vm.setPage(1);
       }

    });

    $scope.pagination = function(start_from,per_page){
        var pagination_attr ={
            offset: start_from,
            limit: per_page
        }
        Posts.pagination(pagination_attr).then(function(data){
            $("#mydiv").hide();
            console.log(data)
            $scope.total_records = data.total;
            $scope.posts = data.posts;
        });
    }

    //set page items - PAGINATION
       function setPage(page) {
           if (page < 1 || page > $scope.vm.pager.totalPages) {
               return;
           }
    
            // get pager object from service
            $scope.vm.pager = PagerService.GetPager($scope.vm.dummyItems, page);
           // get current page items
            $scope.pagination($scope.vm.pager.startIndex,$scope.vm.pager.endPage)
           // get current page of items
        //   $scope.vm.items = $scope.vm.dummyItems.slice($scope.vm.pager.startIndex, $scope.vm.pager.endIndex + 1);
       }

    // paging end
    

   // $scope.posts = postList;
    $scope.activePost = false;
    $scope.setActive = function(post) {
        $scope.activePost = post;
    }

    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        // console.log($scope.data);
        Posts.remove($scope.data).then(function(res) {
           // console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
})
/**
 * EditPostsCtrl
 */
adminApp.controller('EditPostsCtrl', function($scope, Posts, $stateParams) {
    $scope.post = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    Posts.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            // console.log(res);
            $scope.post.description = res.description;
            $scope.post.himage = res.himage;
            $scope.post.simage = res.simage;
            $scope.post.title = res.title;
            $scope.post.paramal = res.paramal;
            $scope.post.metadescription = res.metadescription;
            $scope.post.metakeywords = res.metakeywords;
            $scope.post.id = res._id;
        }
    });
    $scope.editPost = function() {

        $scope.newPost = {};
        $scope.newPost.simage = this.post.simage;
        $scope.newPost.himage = this.post.himage;
        $scope.newPost.title = this.post.title;
        $scope.newPost.description = this.post.description;
        $scope.newPost.metadescription = this.post.metadescription;
        $scope.newPost.metakeywords = this.post.metakeywords;
        $scope.newPost.paramal = this.post.paramal;
        $scope.newPost.author_name = $scope.author_name;
        $scope.newPost.author_image = $scope.author_image;
        $scope.newPost.id = this.post.id;
        Posts.update($scope.newPost).then(function(res) {
            console.log(res);
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
})
/**
 * AddPostCtrl
 */
adminApp.controller('AddPostCtrl', function($scope, Posts) {
    $('#mydiv').hide();
    Posts.getparamel().then(function(data){
        console.log(data);
        console.log('fgdfghg');
    });
    $scope.post = {};
    function shuffle(array) {
        var m = array.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    $scope.addPost = function() {
        $('#mydiv').show(); 
        // console.log(this.post);
        console.log('loading')
        $scope.s_city = this.post.city.split(',');
        $scope.s_title = this.post.title;
        $scope.s_param = this.post.paramal;
        $scope.s_description = this.post.description;
        $scope.s_metadescription = this.post.metadescription;
        $scope.s_metakeywords = this.post.metakeywords;
        $scope.keywords = this.post.keywords.split(',');
        $scope.simage = this.post.simage;
        $scope.himage = this.post.himage;
        $scope.author_name = this.post.author_name;
        $scope.author_image = this.post.author_image;

        for (var i in $scope.s_city) {
            $scope.newPost = {};


            $scope.newPost.simage = $scope.simage;
            $scope.newPost.himage = $scope.himage;
            $scope.newPost.author_name = $scope.author_name;
            $scope.newPost.author_image = $scope.author_image;


//            // title    
            $scope.f_title = $scope.s_title.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.title = $scope.f_title;
//            // param
            $scope.f_param = $scope.s_param.replace(/{city}/gi, $scope.s_city[i]);
            $scope.f_param = $scope.f_param.replace(/ /gi,'-');
            $scope.newPost.paramal = $scope.f_param;
            //description
            $scope.f_description = $scope.s_description.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.description = $scope.f_description;
            //metadescription
            $scope.f_metadescription = $scope.s_metadescription.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.metadescription = $scope.f_metadescription;
            //metakeywords
            $scope.f_metakeywords = $scope.s_metakeywords.replace(/{city}/gi, $scope.s_city[i]);
            $scope.newPost.metakeywords = $scope.f_metakeywords;
//            // add keyworrs
            $scope.k_description = $scope.newPost.description;

            $scope.shuffled = shuffle($scope.keywords);
            $scope.count = $scope.k_description.match(/{keywords}/gi).length;
            for (var k = 0; k <= $scope.count; k++) {
                for (var j in $scope.shuffled) {
                    $scope.m_description = $scope.newPost.description;
                    $scope.l_description = $scope.m_description.replace('{keywords}', $scope.shuffled[j]);
                    $scope.newPost.description = $scope.l_description;
                }
            }
            console.log($scope.newPost);
            Posts.add($scope.newPost).then(function(res) {
                console.log(res);
                $('#mydiv').hide();
            });

            // Posts.add($scope.newPost);
            this.post = {};
        }
    };
});
/**
 * AllUsersCtrl
 */
adminApp.controller('AllUsersCtrl', function($scope, userList,Users,$location) {
    console.log('userList')
    $scope.users = userList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activeUser = user;
        console.log($scope.activeUser);
        
    }
    $scope.deleteUser = function(id) {
        $scope.data={};
         $scope.data.id=id;
         console.log($scope.data);
        Users.remove($scope.data).then(function(res) {
            console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/*
* Add user
*/
adminApp.controller('addUserCtrl',function($scope,Users,$timeout,$location){
    $scope.user = {}
    $scope.message="";
    $scope.success="";
    $scope.addUser = function(){
        //console.log('have ever love someone so much');
        $scope.newUser = {};
        $scope.newUser.email = this.user.email; 
        $scope.newUser.password = this.user.password;
        $scope.newUser.firstname = this.user.firstname;
        $scope.newUser.lastname = this.user.lastname;
        $scope.newUser.dob = this.user.dob;
        $scope.newUser.role = this.user.role;
        $scope.newUser.status = this.user.status;
    

        Users.add($scope.newUser).then(function(res) {
                console.log(res);
                if (res.message) {
                    console.log('already');
                    $scope.message=res.message; 
                     $scope.success = "success";
                } else {
                    console.log('else');
                    $scope.message=res; 
                    $scope.success = "success";
                    $timeout(function() {
                        $location.path('/userList');
                    }, 3000);
                }



        });
        
    }
});
/**
 * EditUsersCtrl
 */
adminApp.controller('editUserCtrl', function($scope, Users, $stateParams) {
    $scope.user = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    Users.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            // console.log(res);
            $scope.user.firstname = res.firstname;
            $scope.user.lastname = res.lastname;
            $scope.user.email = res.email;
            $scope.user.dob = res.dob;
            $scope.user.role = res.role;
            $scope.user.id = res._id;
        }
    });
    $scope.editPost = function() {

        $scope.newPost = {};
        $scope.newPost.firstname = this.user.firstname;
        $scope.newPost.lastname = this.user.lastname;
        $scope.newPost.email = this.user.email;
        $scope.newPost.dob = this.user.dob;
        $scope.newPost.role = this.user.role;
        $scope.newPost.id = this.post.id;
        Users.update($scope.newPost).then(function(res) {
            console.log(res);
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
})
/**
 * AddPortfolioCtrl
 */
adminApp.controller('addPortfolioCtrl', function($scope, Portfolios) {
    $scope.post = {};
    function shuffle(array) {
        var m = array.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    $scope.addPost = function() {
        console.log(this.user);
        $scope.newPost = {};
        $scope.newPost.name = this.post.name;
        $scope.newPost.websiteurl = this.post.websiteurl;
        $scope.newPost.appleurl = this.post.appleurl;
        $scope.newPost.googlepurl = this.post.googlepurl;
        $scope.newPost.image = this.post.image;

        Portfolios.add($scope.newPost).then(function(res) {
            console.log(res);
        });
        console.log('added')
        // Users.add($scope.newPost);
        this.post = {};
    };
});
/**
 * AllUsersCtrl
 */
adminApp.controller('PortfolioListCtrl', function($scope, portfolioList,Users,$location) {
    console.log('PortfolioListCtrl')
    console.log(portfolioList);
    $scope.posts = portfolioList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        // console.log($scope.data);
        Users.remove($scope.data).then(function(res) {
            console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
adminApp.controller('addCategoryCtrl', function($scope,Category) {
    $scope.post={};
    $scope.addPost = function() {
        console.log(this.post);
        $scope.newPost = {};
        $scope.newPost.title = this.post.title;
        $scope.newPost.slug = this.post.slug;
        $scope.newPost.description = this.post.description;

        Category.add($scope.newPost).then(function(res) {
            console.log(res);
            console.log('ashu')
        });
        this.post = {};
    };
});
adminApp.controller('CategoryListCtrl', function($scope,categoryList,Category) {
    
    $scope.posts = categoryList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
        console.log($scope.activePost);
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        // console.log($scope.data);
        Category.remove($scope.data).then(function(res) {
            console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/**
 * EditCategoryCtrl
 */
adminApp.controller('editCategoryCtrl', function($scope, Category, $stateParams) {
    $scope.post = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    Category.sigledata($scope.params).then(function(res) {
        console.log(res);
        if (res == null) {
            window.location.href = '/404';
        } else {
            // console.log(res);
            $scope.post.title = res.title;
            $scope.post.slug = res.slug;
            $scope.post.description = res.description;
            $scope.post.id = res._id;
        }
    });
    $scope.editPost = function() {

        $scope.newPost = {};
        $scope.newPost.title = this.post.title;
        $scope.newPost.description = this.post.description;
        $scope.newPost.id = this.post.id;
        Category.update($scope.newPost).then(function(res) {
            console.log(res);
            if (res) {
                $scope.update = res.message;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
})
/*
* Add Client
*/
adminApp.controller('addClientCtrl',function($scope,Clients){
    $scope.post = {}
    $scope.addPost = function(){
        $scope.newClient = {};
        $scope.newClient.image = this.post.image;

        Clients.add($scope.newClient).then(function(res) {
            console.log(res);
        });
        // Users.add($scope.newPost);
        this.post = {};
        
    }
});
adminApp.controller('ClientListCtrl', function($scope,ClientsList,Clients) {
    
    $scope.posts = ClientsList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
        console.log($scope.activePost);
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        // console.log($scope.data);
        Category.remove($scope.data).then(function(res) {
            console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/*
* Add testimonials
*/
adminApp.controller('addTestimonialCtrl', function($scope,Testimonial) {
    $scope.post={};
    $scope.addPost = function() {
        console.log(this.post);
        $scope.newPost = {};
        $scope.newPost.name = this.post.name;
        $scope.newPost.image = this.post.image;
        $scope.newPost.description = this.post.description;

        Testimonial.add($scope.newPost).then(function(res) {
            console.log(res);
            console.log('ashu')
        });
        this.post = {};
    };
});
/*
* 
*/
adminApp.controller('TestimonialListCtrl', function($scope,testimonialList,Testimonial) {
    
    $scope.posts = testimonialList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
        console.log($scope.activePost);
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        // console.log($scope.data);
        Testimonial.remove($scope.data).then(function(res) {
            console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/*
* ContactListCtrl
*/
adminApp.controller('ContactListCtrl', function($scope,ContactList,Contact) {
    
    $scope.posts = ContactList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
        console.log($scope.activePost);
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        // console.log($scope.data);
        Contact.remove($scope.data).then(function(res) {
            console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});
/*
* RequestsListCtrl
*/
adminApp.controller('RequestsListCtrl', function($scope,RequestsList,Careers) {
    
    $scope.posts = RequestsList;
    $scope.activePost = false;
    $scope.setActive = function(user) {
        $scope.activePost = user;
        console.log($scope.activePost);
    }
    $scope.deletepost = function(id) {
        $scope.data={};
         $scope.data.id=id;
        // console.log($scope.data);
        Careers.remove($scope.data).then(function(res) {
            console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});