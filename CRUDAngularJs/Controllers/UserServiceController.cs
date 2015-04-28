using CRUDAngularJs.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUDAngularJs.Controllers
{
    public class UserServiceController : Controller
    {
        UsersContext context = new UsersContext();


        [HttpPost]
        public int AddUser(UserProfile user)
        {
            user.UserName = user.Name;
            context.UserProfiles.Add(user);
            context.SaveChanges();
            return user.UserId;
        }

        [HttpGet]
        public JsonResult GetUser(int id)
        {
            UserProfile user = context.UserProfiles.Find(id);
            return Json(user,JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetUsersList()
        {
            return Json(context.UserProfiles.ToList(),JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        public void ModifyUser(UserProfile user, int id)
        {
            if (user.UserId == id)
            {
                context.Entry(user).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        [HttpDelete]
        public void DeleteUser(int id)
        {
            UserProfile user = context.UserProfiles.Find(id);
            if (user != null)
            {
                context.UserProfiles.Remove(user);
                context.SaveChanges();
            }

        }

    }
}
