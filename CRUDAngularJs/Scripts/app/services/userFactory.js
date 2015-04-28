app.factory('userFactory', function ($http) {
    return {
        getUsersList: function () {
            url = apiPaths.getAllUser;
            return $http.get(url);
        },
        getUser: function (user) {
            url = apiPaths.getUser + user.UserId;
            return $http.get(url);
        },
        addUser: function (user) {
            url = apiPaths.addUser;
            return $http.post(url, user);
        },
        deleteUser: function (user) {
            url = apiPaths.deleteUser + user.UserId;
            return $http.delete(url);
        },
        updateUser: function (user) {
            url = apiPaths.updateUser + user.UserId;
            return $http.put(url, user);
        }
    };
});