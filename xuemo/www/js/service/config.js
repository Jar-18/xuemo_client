angular.module("service.config",[])
    .constant("URL_CONFIG",{
        status:"online",
        host:{
          normalHost:"http://192.168.2.3:3000",
          imgHost:"http://7xigx5.com1.z0.glb.clouddn.com"
        },
        common:{
            imgApi:"",
            courseComments:{
                "online":"/courseRatings"
            },
            courseAppointment:{
                "online":"/appointments"
            },
            districts:{
                "online":"./json/widget/districts.json"
            },
            courseCategories:{
                "online":"./json/widget/course_categories.json"
            },
            personalInfo:{
                "online":"/users"
            },
            activities:{
                "online":"/activities"
            }
        },
        app:{
            auth: {
                login: {
                    "online":"/auth"
                },
                updateProfile: {
                    "online":"/users"
                }
            },
            user: {
                register: {
                    "online":"/users"
                },
                updatePersonalInfo: {
                    "online":"/users"
                },
                follower: {
                    "online":"/followers"
                },
                uploadUserPhotoToken:{
                    "online":"/files/uploadToken"
                },
            },
            learn:{
                courseList:{
                    "dev":"./json/learn/course_list.json",
                    "online":"/courses"
                },
                relatedCourseList:{
                    "online":"/courses"
                },
                createAppointment: {
                    "online":"/appointments"
                },
                courseFavourite: {
                    "online":"/courseFavourites"
                }
            },
            teach: {
                uploadCoursePhotoToken:{
                    "online":"/files/uploadToken"
                },
                postCourseStep1:{
                    "online":"/courses"
                }
            },
            find:{
                nearbyActivity:{
                    activityList:{
                        "online":"/activities"
                    }
                },
                nearbyPeople: {
                    peopleList:{
                        "online":"/users"
                    }
                }
            }
        }
    });