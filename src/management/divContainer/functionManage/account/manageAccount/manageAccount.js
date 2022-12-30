import React from "react";
import {URL} from "../../../../../url"

class ManageAccount extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
    }

    /*
        - changeUserName: thay đổi username 
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const userName = event.parentNode.firstChild.innerHTML;
        this.props.changeUserName(userName);
        this.props.changeTypeProfile('Chi tiết');
    }

    // Load lần đầu lấy ra danh sách các account đã cấp
    componentDidMount() {
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).users;
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var username = document.createElement('td');
                        var name = document.createElement('td');
                        var type_user = document.createElement('td');
                        var description = document.createElement('td');

                        if (data[i].username) username.innerHTML = data[i].username;
                        else username.innerHTML = '';
                        
                        if (data[i].name) name.innerHTML = data[i].name;
                        else name.innerHTML = '';
                        
                        switch(data[i].type_user) {
                            case 'sc': {
                                type_user.innerHTML = 'service';
                                break;
                            }
                            case 'ag': {
                                type_user.innerHTML = 'agent';
                                break;
                            }
                            default: {
                                type_user.innerHTML = 'producer';
                            }
                        }
                        description.innerHTML = "Xem";

                        tr.appendChild(username);
                        tr.appendChild(name);
                        tr.appendChild(type_user);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                } else alert('ERROR!\n' + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/manager/list_user?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI quản lý account gồm các account đã cấp của ban quản lý
    render() {

        return (
            <table className="tableProductLine">
                <caption>Các tài khoản đã cấp</caption>
                <thead>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Tên</th>
                        <th>Loại tài khoản</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default ManageAccount