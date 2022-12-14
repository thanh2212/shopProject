import React from "react";
import {URL} from "../../../../url"

class Failed extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const productId = event.parentNode.firstChild.innerHTML;
        this.props.changeProductId(productId);
        this.props.changeBackType('Không thể sửa');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra các sản phẩm lỗi gửi về producer
    componentDidMount() {
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).list;
                    const fullData = JSON.parse(this.responseText);
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var id = document.createElement('td');
                        id.className = 'columnId';
                        var name = document.createElement('td');
                        var to = document.createElement('td');
                        var status = document.createElement('td');
                        var description = document.createElement('td');

                        if (data[i]._id) id.innerHTML = data[i]._id;
                        else id.innerHTML = '';
                        
                        if (data[i].name) name.innerHTML = data[i].name;
                        else name.innerHTML = '';
                        
                        if (fullData.prName[i]) to.innerHTML = fullData.prName[i]
                        else to.innerHTML = '';

                        if (fullData.status[i]) status.innerHTML = fullData.status[i]
                        else status.innerHTML = '';
                        description.innerHTML = 'Xem';

                        tr.appendChild(id);
                        tr.appendChild(name);
                        tr.appendChild(to);
                        tr.appendChild(status);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                }
            }
        }
        xmlHttp.open('GET', URL + '/service/error_product?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI danh sách sản phẩm lỗi không sửa đc phải gửi về producer
    render() {
        return(
            <table className='tableProductLine'>
                <caption>Sản phẩm gửi về cơ sở sản xuất</caption>
                <thead>
                    <tr>
                        <th className="columnId">Id</th>
                        <th>Tên</th>
                        <th>Đến</th>
                        <th>CSSX nhận/chưa</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default Failed