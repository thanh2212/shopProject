import React, {Fragment} from "react";
import {URL} from "../../../../url"

class Recall extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.received = this.received.bind(this);
        this.changeBackgorund = this.changeBackgorund.bind(this);
        this.searchAgent = this.searchAgent.bind(this);
    }

    // Lấy ra keyword và gửi request lên server tìm kiếm các TTBH
    searchAgent(event) {
        if (event.keyCode === 13) {
            var keyWord = event.target.value;
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const data = JSON.parse(this.responseText).users;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] === null) continue;
                            const serviceName = data[i].name;
                            var option = document.createElement('option');
                            option.value = serviceName;
                            
                            var datalist = document.querySelector('datalist');
                            datalist.appendChild(option);
                        }
                    }
                }
            }
            xmlHttp.open('POST', URL + '/auth/search_user_by_keyword', false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(
                'type_user=sc'
                + '&keyword=' + keyWord
            )
        }
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const productId = event.parentNode.firstChild.nextSibling.innerHTML;
        this.props.changeProductId(productId);
        this.props.changeBackType('Triệu hồi');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra các sản phẩm đc checked và gửi request để chuyển đi bảo hành
    received(event) {
        event.preventDefault();
        var error = document.getElementsByClassName('errRepair2')[0]; // span hiển thị lỗi
        error.innerHTML = '';
        const serviceName = document.getElementById('servicename').value;
        if (!serviceName) {
            error.innerHTML = 'Bạn chưa chọn TTBH'
            return;
        }
        // Mảng tr có phần tử đầu tiên là th => list sản phẩm đưa đi bảo hành
        var tr = document.querySelectorAll("tr");
        var countChecked = 0; // Đếm số lượng sản phẩm đc checked
        for (var i = 1; i < tr.length; i++) {
            if (tr[i].firstChild.firstChild.checked) {
                const prId = tr[i].firstChild.nextSibling.innerHTML;
                const xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                        } else {
                            error.innerHTML = 'Không tìm thấy TTBH';
                            return;
                        }
                    }
                }
                xmlHttp.open('POST', URL + '/agent/receive_recall', false);
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlHttp.send(
                    'id_product=' + prId
                    + '&service_name=' + serviceName
                )
                countChecked++;
            }
        }
        if (countChecked === 0) error.innerHTML = 'Bạn chưa chọn sản phẩm nào';
        else if (error.innerHTML === '') {
            alert("Thành công!\nSản phẩm đã được chuyển vào mục đem đi bảo hành\nBạn hãy chờ trung tâm bảo hành xác nhận");
            var tbody = document.querySelector('tbody');
            for (var j = tr.length - 1; j > 0; j--) {
                if (tr[j].firstChild.firstChild.checked) {
                    tbody.removeChild(tr[j]);
                }
            }
        }
    }

    // Xử lý event khi 1 row đc checked thì chuyển màu vàng ngược lại chuyển về màu ban đầu
    changeBackgorund(event) {
        var input = event;
        var td = event.parentNode;
        if (input.checked) td.parentNode.style.background = "yellow";
        else if (Number(td.nextSibling.innerHTML) % 2 === 1) td.parentNode.style.background = "rgba(0,0,21,.05)";
        else td.parentNode.style.background = "white";
    }

    // Load lần đầu lấy ra list sản phẩm đang đc triệu hồi của 1 đại lý
    componentDidMount() {
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).list;
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var checkbox = document.createElement('td');
                        var input = document.createElement('input');
                        input.type = 'checkbox';
                        var id = document.createElement('td');
                        id.className = 'columnId';
                        var name = document.createElement('td');
                        var batch = document.createElement('td');
                        var color = document.createElement('td');
                        var description = document.createElement('td');

                        checkbox.appendChild(input);
                        if (data[i]._id) id.innerHTML = data[i]._id;
                        else id.innerHTML = '';

                        if (data[i].name) name.innerHTML = data[i].name;
                        else name.innerHTML = '';

                        if (data[i].batch) batch.innerHTML = data[i].batch;
                        else batch.innerHTML = '';
                        
                        if (data[i].color) color.innerHTML = data[i].color;
                        else color.innerHTML = '';

                        description.innerHTML = 'Xem';

                        tr.appendChild(checkbox);
                        tr.appendChild(id);
                        tr.appendChild(name);
                        tr.appendChild(batch);
                        tr.appendChild(color);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        input.onchange = function() {
                            root.changeBackgorund(this);
                        }

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/agent/list_recall_product?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI các sản phẩm đang được triệu hồi của 1 agent
    render() {

        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Sản phẩm đang được triệu hồi</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="columnId">Id</th>
                            <th>Tên</th>
                            <th>Lô</th>
                            <th>Màu sắc</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div className="divRepair">
                    <form className="repair">
                    </form>
                    <div className="repair">
                        <label htmlFor="select">Đã nhận từ khách hàng - Đưa đi bảo hành: </label>
                        <input id="servicename" list="searchAgent" placeholder="Tìm kiếm TTBH" onKeyUp={this.searchAgent}></input>
                        <datalist id="searchAgent">
                        </datalist>
                        <form onSubmit={this.received}>
                            <span className='errRepair2'></span>
                            <input type='submit' value='Bảo hành' id="special"></input>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Recall