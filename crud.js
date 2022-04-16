$(function(){

    // when page loads, call the given loadRecipies() function

    loadRecipies();

    // #recipies k andr aany wala jo btn-danger ha us pa jb click ho to handleDelete ko call kr do 

    $("#recipies").on("click", ".btn-danger", handleDelete);
    
    //for update record
    $("#recipies").on("click", ".btn-warning", handleUpdate);
    //updateSave button pa jab click ho to do following things
    $("#updateSave").click(function()
    {
        var id =  $("#updateId").val();
        var title =  $("#updateTitle").val();
        var body =  $("#updateBody").val();
        $.ajax
        ({
            url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
            data: {title, body},
            method: "PUT",
            success: function(response)
            {
                loadRecipies();
                $("#updateModal").modal("hide"); //It'll hide the Modal
            }
        });
    });

    // do add recipie
    $("#add-data-btn").click(addRecipie);


});



function loadRecipies()
{
    // AJAX GET Request Start
    $.ajax
    ({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        success: function(response)
        {

            console.log(response);
            var recipies = $("#recipies");
            recipies.empty();
            for(var i = 0; i < response.length; i++)
            {
                var record = response[i];
                recipies.append(`<div class="recipe custom-border" data-id="${record._id}"> <h3 id="id">${record._id} <button class="btn btn-sm btn-danger float-right p-2">Delete</button><button class="btn btn-sm btn-warning float-right p-2">Edit</button></h3> <p id="title">${record.title}</p> <p id="body">${record.body}</p></div>`);
            }
        }
    });
    // AJAX GET Request End
}

function handleDelete()
{
    var btn = $(this); //$(this) btn variable ma us  ki value store kry ga jis pa click hoga as we have multiple buttons 
    var parentDiv = btn.closest(".recipe"); //btn ka parent .recipe
    let id = parentDiv.attr("data-id"); //this will save attr 'data-id' into id variable given in parentDiv
    // console.log("delete btn clicked");
    // console.log(id);

    $.ajax
    ({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: function()
        {
            loadRecipies(); //after deleting any data, that data will be deleted from server and we again call loadrecipies() method that will request 'GET' and fetch updated data from server 
        }
    });


}

function addRecipie()
{
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax
    ({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data: {title, body},
        success: function(response)
        {
            $("#title").val("");
            $("#body").val("");
            loadRecipies();
        }
    });
    
    alert("Data added successfully");
}

function handleUpdate()
{
    var btn = $(this); //$(this) btn variable ma us  ki value store kry ga jis pa click hoga as we have multiple buttons 
    var parentDiv = btn.closest(".recipe"); //btn ka parent .recipe
    let id = parentDiv.attr("data-id"); //this will save attr 'data-id' into id variable given in parentDiv

    $.ajax
    ({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        success: function(response)
        {
            $("#updateId").val(response._id);
            $("#updateTitle").val(response.title);
            $("#updateBody").val(response.body);
            $("#updateModal").modal("show"); //It'll show the Modal from HTML file 
        }
    })
    
}