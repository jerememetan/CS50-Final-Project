
document.addEventListener('DOMContentLoaded', function() {

    let id = document.querySelectorAll("#delete_button");
    let deleteButton = document.querySelectorAll("#delete_id");

    for (let i = 0; i < id.length; i++) {
        let number = id[i].getAttribute("value");
        deleteButton[i].value = number;
    }
    // TODO: Implement seperating and joining of bookings
    let localStorage = window.sessionStorage;
    let seperated_btn = document.getElementById("seperated_bookings_btn");
    let joint_btn = document.getElementById("joint_bookings_btn");
    // first time user will have a seperated bookings selected

    function loadtable() {

        console.log("before if statements" + localStorage.getItem("sorted_bookings_btn"))
        if (localStorage.getItem("sorted_bookings_btn") == "seperated_bookings_btn") {
            // REMOVE THE JOINT BOOKINGS, DISPLAY ONLY SEPERATED BOOKINGS
            seperated_btn.checked = true;
            document.getElementById("joint_table").hidden = true;
            document.getElementById("seperated_table").hidden = false;
            return 1;
        } else if (localStorage.getItem("sorted_bookings_btn") == "joint_bookings_btn") {
            // REMOVE THE SEPERATED BOOKINGS, DISPLAY ONLY JOINT BOOKINGS
            joint_btn.checked = true;
            document.getElementById("joint_table").hidden = false;
            document.getElementById("seperated_table").hidden = true;
            return 1;
        } else {
            document.getElementById("joint_table").hidden = true;
            document.getElementById("seperated_table").hidden = false;
            localStorage.setItem("sorted_bookings_btn", "seperated_bookings_btn");
            return 0; // 0 = error/no input field
        }
    }
    loadtable();
    // add event listeners for both checkboxes
    seperated_btn.addEventListener('change', function(){
        if (this.checked)
        {
            localStorage.setItem("sorted_bookings_btn", "seperated_bookings_btn");
            loadtable();

        }
    });

    joint_btn.addEventListener('change', function(){
        if (this.checked)
        {
            localStorage.setItem("sorted_bookings_btn", "joint_bookings_btn");
            loadtable();
        }
    });

    

    function loadmodaldata(button){

        let date_str = button.getAttribute('date');
            let date_parts = date_str.split("/");
            // format date
            let date = date_parts[2] + "-" + date_parts[1] + "-" + date_parts[0];
            // console.log("date:" + date);
            let start_time = button.getAttribute('start_time');
            let end_time = button.getAttribute('end_time');
            let contact = button.getAttribute('contact');
            let type = button.getAttribute('detail');
            // splits types by commas
            let type_parts = type.split(","); 
            // console.log("type parts:" + type_parts[0]);
            let buttonid = button.getAttribute('id');
            // modal's query selectors
            let dateinput = modal.querySelector('.date');
            let detail = modal.querySelector('#details');
            let number = modal.querySelector('#number');
            // console.log("detail:", detail)
            // pre setting the modal value accordingly
            dateinput.value = date;
            detail.value = type;
            number.value = contact;
            // console.log("detail value:", type)

            // pre setting the time input accordingly
            document.getElementById('booking_id').value = buttonid;
            let selectedStartOption = document.getElementById('start-'+ start_time);
            selectedStartOption.selected = true;

            let selectedEndOption = document.getElementById('end-'+ end_time);
            selectedEndOption.selected = true;
            let tagElements = modal.querySelectorAll('[name^="tag"]');
            // console.log("tagElements", tagElements);

            for (let j = 0; j < tagElements.length; j++) {
                for (let k = 0; k < type_parts.length; k++) {
                    if (tagElements[j].id === type_parts[k].trim()) {
                        tagElements[j].checked = true;
                        break;
                    } else {
                        tagElements[j].checked = false;
                    }
                }
                
            }
    }



    const modal = document.getElementById('Modal');
    let edit_btns = document.querySelectorAll(".edit_btn");

    $(modal).one('shown.bs.modal', function () {
        let detail = modal.querySelector('#details');
        let tagElements = modal.querySelectorAll('[name^="tag"]');
        console.log("detail:", detail)
        console.log("tagElements", tagElements);

       
    });

    edit_btns.forEach(button => {
        // Attach new event listener
        button.addEventListener('click', function() {
          loadmodaldata(button);
          console.log("test");
        
        });
    });


    // whenever a tag is clicked,
    const tagElements = document.querySelectorAll('[name^="tag"]');
    tagElements.forEach(tag => {
        tag.addEventListener('click', function() {
            console.log("tag clicked:", this.id);
            let details = modal.querySelector('#details');
            console.log("newdetails:", details.value);

            if (this.checked) {
                if (details.value.trim() === "") 
                {
                    details.value = this.id;
                }
                else 
                {
                    details.value += ", " + this.id;
                }
        
                
            } 
            // if unchecked, remove the WORD from the input field
            if (!this.checked) {
                let regex = new RegExp("\\s*,\\s*" + this.id.trim());
                details.value = details.value.replace(regex, "");
                    // remove trailing comma if exists
                    if (details.value.endsWith(",")) {
                        details.values = details.value.slice(0, -1);
                    
                    }
                }
            if (details.value.trim() === "") {
                details.value = details.value.trim();
            }
        });
    });

 
});
