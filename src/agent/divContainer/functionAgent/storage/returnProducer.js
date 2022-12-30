import React, {Fragment} from "react";
import {URL} from "../../../../url"

class ReturnProducer extends React.Component {

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
        this.props.changeBackType('Trả lại cơ sở sản xuất');
        this.props.changeTypeProfile('Xem');
    }

    // Load lần đầu lấy ra các sản phẩm cũ trả về cho producer
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

                        id.innerHTML = data[i]._id;
                        name.innerHTML = data[i].name;
                        batch.innerHTML = data[i].batch;
                        color.innerHTML = data[i].color;
                        description.innerHTML = 'Xem';

                        tr.appendChild(id);
                        tr.appendChild(name);
                        tr.appendChild(batch);
                        tr.appendChild(color);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/agent/list_back_production?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI các sản phẩm cũ trả lại cho producer của agent
    render() {

        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Sản phẩm cũ trả lại cơ sở sản xuất</caption>
                    <thead>
                        <tr>
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
            </Fragment>
        )
    }
}

export default ReturnProducer