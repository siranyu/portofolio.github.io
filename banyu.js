var table1 = document.getElementById("table");
var table2 = document.getElementById("table2");

var dataTable1 = JSON.parse(localStorage.getItem("databuku1"));
if (dataTable1) {
    for (var i = 0; i < dataTable1.length; i++) {
        table1.innerHTML += "<tr><td>" + dataTable1[i].title + "</td><td>" + dataTable1[i].author + "</td><td>" + dataTable1[i].year + "</td><td>" + '<button onclick="bacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Sudah Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>' + "</td></tr>";
    }
}
var dataTable2 = JSON.parse(localStorage.getItem("databuku2"));
if (dataTable2) {
    for (var i = 0; i < dataTable2.length; i++) {
        table2.innerHTML += "<tr><td>" + dataTable2[i].title + "</td><td>" + dataTable2[i].author + "</td><td>" + dataTable2[i].year + "</td><td>" + '<button onclick="belumBacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Belum Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>' + "</td></tr>";
    }
}

var data = [];
var data2 = [];
var btnSudahBaca = document.getElementById("ceklis");

document.getElementById("submit").onclick = function () {
    if (document.getElementById("judul_buku").value == 0 || document.getElementById("pengarang").value == 0 || document.getElementById("tahun").value == 0) {
        window.alert('Lengkapi judul buku dan pengarang terlebih dahulu!');

        return;
    }

    else {
        if (btnSudahBaca.checked == false) {

            if (data.length > 0) {
                var dataTable1 = JSON.parse(localStorage.getItem("databuku1"));                

                dataTable1.push({
                    'id' : Date.now(),
                    'title': document.getElementById("judul_buku").value,
                    'author': document.getElementById("pengarang").value,
                    'year':  document.getElementById("tahun").value,
                    'isComplete': false
                });

                localStorage.setItem("databuku1", JSON.stringify(dataTable1));
            }

            else {
                data.push({
                    'id' : Date.now(),
                    'title': document.getElementById("judul_buku").value,
                    'author': document.getElementById("pengarang").value,
                    'year': document.getElementById("tahun").value,
                    'isComplete': false
                });
                localStorage.setItem("databuku1", JSON.stringify(data));
            }

            //Define table di javascript
            var table = document.getElementById("table");
            var row = table.insertRow(-1);

            var judul_buku = row.insertCell(0);
            judul_buku.innerHTML = document.getElementById("judul_buku").value;

            var author = row.insertCell(1);
            author.innerHTML = document.getElementById("pengarang").value;

            var tahun = row.insertCell(2);
            tahun.innerHTML = document.getElementById("tahun").value;

            row.insertCell(3).innerHTML =
                '<button onclick="bacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Sudah Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>';
        }
        else {
            var dataTable2 = JSON.parse(localStorage.getItem("databuku2"));
            var table2 = document.getElementById("table2");

            if (data2.length > 0) {
                dataTable2.push({
                    'id' : Date.now(),
                    'title': document.getElementById("judul_buku").value,
                    'author': document.getElementById("pengarang").value,
                    'year': document.getElementById("tahun").value,
                    'isComplete': true
                });

                localStorage.setItem("databuku2", JSON.stringify(dataTable2));
            } else {
                data2.push({
                    'id' : Date.now(),
                    'title': document.getElementById("judul_buku").value,
                    'author': document.getElementById("pengarang").value,
                    'year': document.getElementById("tahun").value,
                    'isComplete': true
                });
                localStorage.setItem("databuku2", JSON.stringify(data2));
            }

            var table = document.getElementById("table2");
            var row = table2.insertRow(-1);

            var judul_buku = row.insertCell(0);
            judul_buku.innerHTML = document.getElementById("judul_buku").value;

            var author = row.insertCell(1);
            author.innerHTML = document.getElementById("pengarang").value;

            var tahun = row.insertCell(2);
            tahun.innerHTML = document.getElementById("tahun").value;

            row.insertCell(3).innerHTML =
                '<button onclick="belumBacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Belum Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>';
        }
    }
}

function bacaBuku(button) {
    //Define table2 di javascript
    var table2 = document.getElementById("table2");
    var row2 = table2.insertRow(-1);
    // Ambil data row dari button yang di pencet "baca buku"
    let row = button.parentNode.parentNode;
    // Remove row nya dari table yang belum di baca 
    row.parentNode.removeChild(row);

    // Ambil string judul buku
    var namaBuku = row.cells[0]['innerText'];
    var pengarangBuku = row.cells[1]['innerText'];
    var tahunBuku = row.cells[2]['innerText'];

    var judul_buku = row2.insertCell(0);
    judul_buku.innerHTML = namaBuku;

    var pengarang = row2.insertCell(1);
    pengarang.innerHTML = pengarangBuku;

    var tahun = row2.insertCell(2);
    tahun.innerHTML = tahunBuku;

    row2.insertCell(3).innerHTML =
        '<button onclick="belumBacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Belum Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>';

    var dataTable1 = JSON.parse(localStorage.getItem("databuku1"));
    var deleteStorageTable1 = dataTable1.filter(object => {
        return object.title != namaBuku;
    });
    localStorage.setItem("databuku1", JSON.stringify(deleteStorageTable1));


    var dataTable2 = JSON.parse(localStorage.getItem("databuku2"));
    if (dataTable2 && dataTable2.length > 0) {
        dataTable2.push({
            'id' : Date.now(),
            'title': namaBuku,
            'author': pengarangBuku,
            'year': tahunBuku,
            'isComplete': true
        });
        localStorage.setItem("databuku2", JSON.stringify(dataTable2));
    } else {
        var data = [];
        data.push({
            'id' : Date.now(),
            'title': namaBuku,
            'author': pengarangBuku,
            'year': tahunBuku,
            'isComplete': true
        });

        localStorage.setItem("databuku2", JSON.stringify(data));
    }
}

function belumBacaBuku(button) {
    //Define table2 di javascript
    var table = document.getElementById("table");
    var row = table.insertRow(-1);
    // Ambil data row dari button yang di pencet "baca buku"
    let row2 = button.parentNode.parentNode;
    // Remove row nya dari table yang belum di baca 
    row2.parentNode.removeChild(row2);

    // Ambil string judul buku
    var namaBuku = row2.cells[0]['innerText'];
    var pengarangBuku = row2.cells[1]['innerText'];
    var tahunBuku = row2.cells[2]['innerText'];

    var judul_buku = row.insertCell(0);
    judul_buku.innerHTML = namaBuku;

    var pengarang = row.insertCell(1);
    pengarang.innerHTML = pengarangBuku;

    var tahun = row.insertCell(2);
    tahun.innerHTML = tahunBuku;

    row.insertCell(3).innerHTML =
        '<button onclick="bacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Sudah Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>';

    var dataTable2 = JSON.parse(localStorage.getItem("databuku2"));
    var deleteStorageTable2 = dataTable2.filter(object => {
        return object.title != namaBuku;
    });
    localStorage.setItem("databuku2", JSON.stringify(deleteStorageTable2));


    var dataTable1 = JSON.parse(localStorage.getItem("databuku1"));
    if (dataTable1 && dataTable1.length > 0) {
        dataTable1.push({
            'id' : Date.now(),
            'title': namaBuku,
            'author': pengarangBuku,
            'year': tahunBuku,
            'isComplete': false
        });
        localStorage.setItem("databuku1", JSON.stringify(dataTable1));
    } else {
        var data = [];
        data.push({
            'id' : Date.now(),
            'title': namaBuku,
            'author': pengarangBuku,
            'year': tahunBuku,
            'isComplete': false
        });

        localStorage.setItem("databuku1", JSON.stringify(data));
    }
}


function deleteData(button) {
    if (window.confirm("Apakah kamu yakin untuk menghapus Data Buku ini?")) {
        // Ambil data row dari button yang di pencet "baca buku"
        let row = button.parentNode.parentNode;
        // Remove row nya dari table yang belum di baca 
        row.parentNode.removeChild(row);

        // Ambil string judul buku
        var namaBuku = row.cells[0]['innerText'];

        var dataTable1 = JSON.parse(localStorage.getItem("databuku1"));
        var complete = dataTable1.filter(object => {
            return object.title == namaBuku;
        });

        if (complete.length > 0) {
            var test = complete[0].isComplete
        } else {
            var dataTable2 = JSON.parse(localStorage.getItem("databuku2"));
            complete = dataTable2.filter(object => {
                return object.title == namaBuku;
            });
            test = complete[0].isComplete
        }

        if (test == false) {
            var dataTable1 = JSON.parse(localStorage.getItem("databuku1"));
            var deleteStorageTable1 = dataTable1.filter(object => {
                return object.title != namaBuku;
            });
            localStorage.setItem("databuku1", JSON.stringify(deleteStorageTable1));
        } else {
            var dataTable2 = JSON.parse(localStorage.getItem("databuku2"));
            var deleteStorageTable2 = dataTable2.filter(object => {
                return object.title != namaBuku;
            });
            localStorage.setItem("databuku2", JSON.stringify(deleteStorageTable2));
        }
    } else {
        
        return;
    }
}

function searchData1() {
    var searchValue = document.getElementById("search").value;
    var dataTable1 = JSON.parse(localStorage.getItem("databuku1"));
    var table = document.getElementById("table");

    var dataFilterBuku = dataTable1.filter(object => {
        return object.title.includes(searchValue) || object.author.includes(searchValue) || object.year.includes(searchValue);
    })

    for (var i = 1; i < table.rows.length;) {
        table.deleteRow(i);
    }

    if (searchValue != '') {
        if (dataFilterBuku.length > 0) {
            var index = 0;
            for (i = 0; i < dataFilterBuku.length; i++) {
                var row = table.insertRow(-1);

                var judul_buku = row.insertCell(0);
                judul_buku.innerHTML = dataFilterBuku[index].title;

                var author = row.insertCell(1);
                author.innerHTML = dataFilterBuku[index].author;

                var tahun = row.insertCell(2);
                tahun.innerHTML = dataFilterBuku[index].year;

                row.insertCell(3).innerHTML =
                    '<button onclick="bacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Sudah Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>';

                index++;
            }
        }
    } else {
        var data = JSON.parse(localStorage.getItem("databuku1"));
        if (data) {
            for (var i = 0; i < data.length; i++) {
                table.innerHTML += "<tr><td>" + data[i].title + "</td><td>" + data[i].author + "</td><td>" + data[i].year + "</td><td>" + '<button onclick="bacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Sudah Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>' + "</td></tr>";
            }
        }
    }


}

function searchData2() {
    var searchValue2 = document.getElementById("search2").value;
    var dataTable2 = JSON.parse(localStorage.getItem("databuku2"));
    var table2 = document.getElementById("table2");

    var dataFilterBuku2 = dataTable2.filter(object => {
        return object.title.includes(searchValue2) || object.author.includes(searchValue2) || object.year.includes(searchValue2);
    })

    for (var i = 1; i < table2.rows.length;) {
        table2.deleteRow(i);
    }

    if (searchValue2 != '') {
        if (dataFilterBuku2.length > 0) {
            var index = 0;
            for (i = 0; i < dataFilterBuku2.length; i++) {
                var row = table2.insertRow(-1);

                var judul_buku = row.insertCell(0);
                judul_buku.innerHTML = dataFilterBuku2[index].title;

                var author = row.insertCell(1);
                author.innerHTML = dataFilterBuku2[index].author;

                var tahun = row.insertCell(2);
                tahun.innerHTML = dataFilterBuku2[index].year;

                row.insertCell(3).innerHTML =
                    '<button onclick="belumBacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Belum Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>';

                index++;
            }
        }
    } else {
        var data2 = JSON.parse(localStorage.getItem("databuku2"));
        if (data2) {
            for (var i = 0; i < data2.length; i++) {
                table2.innerHTML += "<tr><td>" + data2[i].title + "</td><td>" + data2[i].author + "</td><td>" + data2[i].year + "</td><td>" + '<button onclick="belumBacaBuku(this)"class="btn btn-success btn-sm" style="font-weight: bold; margin-right: 8px;">Belum Baca</button><button style="font-weight: bold;" onclick="deleteData(this)" class="btn btn-danger btn-sm">Delete</button>' + "</td></tr>";
            }
        }
    }


}