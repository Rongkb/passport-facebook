$('#paging').pagination({
    dataSource: './api/user?page=1',
    locator: 'data',
    totalNumberLocator: function (response) {

        return response.total;
    },
    pageSize: 2,
    afterPageOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    },
    afterNextOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    },
    afterPreviousOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    }
})

function loadPage(page) {
    $('#content').html('')
    $.ajax({
        url: './api/user?page=' + page,
        type: 'GET'
    })
        .then(rs => {
            console.log(rs)
            for (i = 0; i < rs.data.length; i++) {
                let element = rs.data[i]
                var item = $(`<h3>${element.username}</h3>`)
                console.log('item: ', item)
                $('#content').append(item)
            }
        })
        .catch(err => {
            console.log(err)
        })
}
loadPage(1)