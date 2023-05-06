$.ajax({
    url: './api/user?page=1',
    type: "GET"
})
    .then(data => {
        console.log(data)
        $('#content').html('')
        for (i = 0; i < data.length; i++) {
            const element = data[i]
            var item = $(`<h1>${element.username} : ${element.password}</h1>`)
            $('#content').append(item)

        }
    })
    .catch(err => {
        console.log(err)
    })

var currentPage = 1
function loadPage(page) {
    currentPage = page
    $.ajax({
        url: './api/user?page=' + page,
        type: "GET"
    })
        .then(data => {
            console.log(data)
            $('#content').html('')
            for (i = 0; i < data.length; i++) {
                const element = data[i]
                var item = $(`<h1>${element.username} : ${element.password}</h1>`)
                $('#content').append(item)

            }
        })
        .catch(err => {
            console.log(err)
        })
}

function nextPage() {
    currentPage++
    $.ajax({
        url: "./api/user?page=" + currentPage,
        type: "GET"
    })
        .then(data => {
            $('#content').html('')
            for (i = 0; i < data.length; i++) {
                const element = data[i]
                let item = (`<h1>${element.username} : ${element.password}</h1>`)
                $('#content').append(item)
            }
        })
        .catch(err => {
            console.log(err)
        })
}

function previousPage() {
    currentPage--
    $.ajax({
        url: "./api/user?page=" + currentPage,
        type: "GET"
    })
        .then(data => {
            $('#content').html('')
            for (i = 0; i < data.length; i++) {
                const element = data[i]
                let item = (`<h1>${element.username} : ${element.password}</h1>`)
                $('#content').append(item)
            }
        })
        .catch(err => {
            console.log(err)
        })
}