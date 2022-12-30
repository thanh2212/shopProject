import React from "react";
import {URL} from "../../../../url"

class ReturnCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.returnCustomer = this.returnCustomer.bind(this);
        this.show = this.show.bind(this);
    }

    // Trả sản phẩm bảo hành xong về cho khách hàng
    returnCustomer(event) {
        var prId = event.parentNode.firstChild.innerHTML;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    
                }
            }
        }
        xmlHttp.open('POST', URL + '/agent/return_customer', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id_product=' + prId
        )
        alert("Thành công!\nSản phẩm đã được chuyển vào mục đã bán");
        var tbody = document.querySelector('tbody');
        tbody.removeChild(event.parentNode);
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const productId = event.parentNode.firstChild.innerHTML;
        this.props.changeProductId(productId);
        this.props.changeBackType('Trả lại cho khách hàng');
        this.props.changeTypeProfile('Xem');
    }

    // Load lần đầu lấy ra các sản phẩm đã bảo hành xong đang trong kho của agent
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
                        var id = document.createElement('td');
                        id.className = 'columnId';
                        var name = document.createElement('td');
                        var batch = document.createElement('td');
                        var color = document.createElement('td');
                        var description = document.createElement('td');
                        var returnCus = document.createElement('td');

                        id.innerHTML = data[i]._id;
                        name.innerHTML = data[i].name;
                        batch.innerHTML = data[i].batch;
                        color.innerHTML = data[i].color;
                        description.innerHTML = 'Xem';
                        returnCus.innerHTML = 'Trả lại';

                        tr.appendChild(id);
                        tr.appendChild(name);
                        tr.appendChild(batch);
                        tr.appendChild(color);
                        tr.appendChild(description);
                        tr.appendChild(returnCus);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }

                        returnCus.style.cursor = 'pointer';
                        returnCus.onclick = function() {
                            root.returnCustomer(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/agent/list_fixed_product_ic?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI các sản phẩm đã bảo hành xong mà trong kho của agent để agent có thể trả lại cho khách hàng
    render() {
        return(
            <table className='tableProductLine'>
                <caption>Đã bảo hành xong - Cần trả lại cho khách hàng</caption>
                <thead>
                    <tr>
                        <th className="columnId">Id</th>
                        <th>Tên</th>
                        <th>Lô</th>
                        <th>Màu sắc</th>
                        <th>Chi tiết</th>
                        <th>Trả lại khách</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default ReturnCustomer