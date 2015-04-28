app.controller('userController', function PostController($scope, userFactory) {
    $scope.users = [];
    $scope.user = null;
    $scope.editMode = false;
    $scope.viewPopup = false;
    $scope.detailPopup = false;
    //TO DO: CRUD Opeartions

    // add User
    $scope.add = function () {
        var currentUser = this.user;
        if (currentUser != null && currentUser.Name != null && currentUser.Address && currentUser.ContactNo) {
            userFactory.addUser(currentUser).success(function (data) {
                $scope.addMode = false;
                currentUser.UserId = data;
                $scope.users.push(currentUser);
 
                //reset form
                $scope.cancel();
                // $scope.adduserform.$setPristine(); //for form reset
                $('#userModel').modal('hide');
            }).error(function (data) {
                $scope.error = "An Error has occured while Adding user! " + data.ExceptionMessage;
            });
        }
    };
    //Model popup events
    $scope.showadd = function () {
        $scope.user = null;
        $scope.editMode = false;
        $scope.viewPopup=true;
       
    };
    $scope.cancel = function () {
        $scope.user = null;
        $scope.viewPopup = false;
        $scope.detailPopup = false;
        $scope.getAll();
    };
   
    //get User
    $scope.get = function () {
        userFactory.getUser(this.user).success(function (data) {
            $scope.user = data;
            $scope.detailPopup = true;
        }).error(function (data) {
            $scope.error = "An Error has occured while Loading users! " + data.ExceptionMessage;
        });
        //$scope.user = this.user;
      
    };
    //get all Users
    $scope.getAll = function () {
        userFactory.getUsersList().success(function (data) {
            $scope.users = data;
        }).error(function (data) {
            $scope.error = "An Error has occured while Loading users! " + data.ExceptionMessage;
        });
    };

    //update user
    $scope.update = function () {
        var currentUser = this.user;
        userFactory.updateUser(currentUser).success(function (data) {
            currentUser.editMode = false;

            $scope.cancel();
           
        }).error(function (data) {
            $scope.error = "An Error has occured while Updating user! " + data.ExceptionMessage;
        });
    };

    $scope.edit = function (user) {
        $scope.editMode = true;
        $scope.viewPopup = true;
        $scope.user = user;
    };

    // delete User
    $scope.delete = function () {
        currentUser = $scope.user;
        userFactory.deleteUser(currentUser).success(function (data) {
            $scope.cancel();

        }).error(function (data) {
            $scope.error = "An Error has occured while Deleting user! " + data.ExceptionMessage;

            $('#confirmModal').modal('hide');
        });
    };

    $scope.showconfirm = function (data) {
        $scope.user = data;
        if (confirm("want to delete?"))
            $scope.delete();
        else
            $scope.cancel();
    };


    // initialize your users data
    $scope.getAll();
});