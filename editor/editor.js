const recordsContainer =
document.getElementById("recordsContainer");

async function api(data){

    const response = await fetch(
        API_URL,
        {
            method:"POST",
            body:JSON.stringify(data)
        }
    );

    return await response.json();
}

async function addAnnouncement(){

    await api({
        action:"addAnnouncement",
        title:
            announcementTitle.value,
        content:
            announcementContent.value,
        writer:
            announcementWriter.value,
        image:
            announcementImage.value,
        pdf:
            announcementPDF.value,
        link:
            announcementLink.value
    });

    clearForm("announcement");

    loadRecords();

    alert("Announcement Added");
}

async function addCircular(){

    await api({
        action:"addCircular",
        title:
            circularTitle.value,
        content:
            circularContent.value,
        writer:
            circularWriter.value,
        image:
            circularImage.value,
        pdf:
            circularPDF.value,
        link:
            circularLink.value
    });

    clearForm("circular");

    loadRecords();

    alert("Circular Added");
}

async function addEvent(){

    await api({
        action:"addEvent",
        title:
            eventTitle.value,
        content:
            eventContent.value,
        writer:
            eventWriter.value,
        image:
            eventImage.value,
        pdf:
            eventPDF.value,
        link:
            eventLink.value,
        eventDate:
            eventDate.value
    });

    clearForm("event");

    loadRecords();

    alert("Event Added");
}

async function addLeftLink(){

    await api({
        action:"addLeftLink",
        name:leftName.value,
        url:leftURL.value,
        image:leftImage.value
    });

    leftName.value="";
    leftURL.value="";
    leftImage.value="";

    loadRecords();

    alert("Left Link Added");
}

async function addRightLink(){

    await api({
        action:"addRightLink",
        name:rightName.value,
        url:rightURL.value,
        image:rightImage.value
    });

    rightName.value="";
    rightURL.value="";
    rightImage.value="";

    loadRecords();

    alert("Right Link Added");
}

function clearForm(type){

    document
    .querySelectorAll(
        `#${type} input,#${type} textarea`
    );

}

async function loadRecords(){

    const response =
    await fetch(
        `${API_URL}?action=getAll`
    );

    const data =
    await response.json();

    recordsContainer.innerHTML="";

    buildSection(
        "Announcements",
        data.announcements,
        "deleteAnnouncement"
    );

    buildSection(
        "Circulars",
        data.circulars,
        "deleteCircular"
    );

    buildSection(
        "Events",
        data.events,
        "deleteEvent"
    );

    buildSection(
        "Left Links",
        data.leftLinks,
        "deleteLeftLink"
    );

    buildSection(
        "Right Links",
        data.rightLinks,
        "deleteRightLink"
    );
}

function buildSection(
    title,
    items,
    deleteAction
){

    let html = `
        <h2>${title}</h2>
    `;

    items.forEach(item=>{

        html += `
        <div class="record-card">

            <strong>
            ${
                item.Title ||
                item.Name ||
                "Untitled"
            }
            </strong>

            <br>

            ${
                item.Content || ""
            }

            <br><br>

            <button
                class="delete-btn"
                onclick="
                    deleteRecord(
                        '${deleteAction}',
                        '${item.ID}'
                    )
                ">
                Delete
            </button>

        </div>
        `;
    });

    recordsContainer.innerHTML += html;
}

async function deleteRecord(
    action,
    id
){

    if(
        !confirm(
            "Delete this record?"
        )
    ) return;

    await api({
        action:action,
        id:id
    });

    loadRecords();
}

loadRecords();