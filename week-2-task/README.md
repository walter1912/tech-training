project structure: 
 1.src
    2.api : nơi chứa thông tin api, hiện đang là file JSON
    2.app : dùng App Router để định tuyến và viết frontend cho trang web
        3. api: dùng App Routes để viết backend cho trang web 
            4. CRUD-basis: viết các hàm ở server (dùng "use server") để viết các logic có thể tái sử dụng cho api
    2.assets : chứa các file media, resource khác dùng chung cho trang web (cả server và  client)
    2.components : chứa các component có thể tái sử dụng
        3. Layout: layout dùng chung cho các trang, ở phạm vi global, chứa header, footer, sidebar
    2.custom-styled : chứa các thẻ dược style bởi styled-component, có thể tái sử dụng ở nhiều chỗ
    2.pages : chứa UI của các trang web
    2.routes : chứa thông tin các route (có thể thêm icon, label,...)
    2.services : nơi chứa các hàm để client tương tác với server thông qua fetch 
    2.utils : chứa các hàm tiện ích dùng ở cả server  và client


Process: 
    => fetch data ở app/[route]/page.jsx 
    => gọi tới các service ở services/[service].jsx
    => gọi tới các api ở server: app/api/[api]/route.js
    => thao tác với JSON 
    => server trả lại dữ liệu cho client (trả lại app/[route]/page.jsx )
    => xử lý và truyền dữ liệu vào Component ở pages/[Component].jsx
    => render data ở pages/[Component].jsx
    => nếu có thao tác fetch data trong khi Component mount thì sẽ xử lý ở pages/[Component].jsx và gọi tới service

    