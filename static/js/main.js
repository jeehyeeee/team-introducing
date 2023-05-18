$(function () {
    set_members();

    function set_members() {
        fetch("/introduce/read").then((res) => res.json()).then((data) => {
            let rows = data['result'];

            $('.member-cards').remove();

            rows.forEach((a) => {
                let image = a['img'];
                let name = a['name'];
                let _id = a['_id'];

                let temp_html = `<div class="col-3 member-cards" data-num="${_id}">
                                    <div class="card shadow-sm" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                                    <img src="${image}" class="card-img-top" alt="멤버 사진" />
                                    <div class="card-body">
                                        <h5 class="card-title">${name}</h5>
                                    </div>
                                    </div>
                                </div>`;
                $('#pills-members .row').prepend(temp_html);

            });

            $('.member-cards').click(function () {
                let id = $(this).data('num');

                $('.modal-info').attr('data-num', id);

                let all_id = rows.map(rows => rows['_id']);

                let idxNum = $.inArray(id, all_id);

                let this_data = rows[idxNum];

                let modal_name = this_data['name'];
                let modal_image = this_data['img'];
                let modal_comment = this_data['comment'];
                let modal_mbti = this_data['mbti'];
                let modal_blog = this_data['blog'];

                $('.content-img').attr('src', modal_image);
                $('.content-name').text(modal_name);
                $('.content-mbti').text(modal_mbti);
                $('.content-blog').attr('href', modal_blog);
                $('.content-comment').text(modal_comment);

            });

            $('.edit-btn').click(function () {
                $('#exampleModalToggle').modal('toggle');
            });
            $('.back-modal').click(function () {
                $('#exampleModalToggle2').modal('toggle');
            });

            //  수정하기 클릭
            $('.edit-btn').click(function () {
                let id = $('.modal-info').data('num');

                let all_id = rows.map(rows => rows['_id']);

                let idxNum = $.inArray(id, all_id);

                let this_data = rows[idxNum];

                let modal_name = this_data['name'];
                let modal_image = this_data['img'];
                let modal_comment = this_data['comment'];
                let modal_mbti = this_data['mbti'];
                let modal_blog = this_data['blog'];

                $("#floatingInput1-2").val(modal_image);
                $("#floatingInput2-2").val(modal_name);
                $("#floatingInput3-2").val(modal_mbti);
                $("#floatingInput4-2").val(modal_blog);
                $('#floatingTextarea-2').text(modal_comment);
            });

            //  수정 완료 클릭
            $('#update').click(edit_check);

            const $imgInput = $("#floatingInput1-2");
            const $nameInput = $("#floatingInput2-2");
            const $mbtiInput = $("#floatingInput3-2");
            const $blogInput = $("#floatingInput4-2");
            const $pwInput = $("#floatingInput5-2");
            const $commentInput = $('#floatingTextarea-2');

            function edit_check() {
                if (!$imgInput.val()) {
                    alert('이미지URL을 입력해 주세요');
                    $imgInput.focus();
                    return false;
                } else if (!$nameInput.val()) {
                    alert('이름을 입력해 주세요');
                    $nameInput.focus();
                    return false;
                } else if (!$mbtiInput.val()) {
                    alert('MBTI를 입력해 주세요');
                    $mbtiInput.focus();
                    return false;
                } else if (!$blogInput.val()) {
                    alert('블로그 URL을 입력해 주세요');
                    $blogInput.focus();
                    return false;
                } else if (!$commentInput.val()) {
                    alert('자기소개를 입력해 주세요');
                    $commentInput.focus();
                    return false;
                } else {
                    pw_check();
                }
            }

            function pw_check() {
                let id = $('.modal-info').data('num');
                let all_id = rows.map(rows => rows['_id']);
                let idxNum = $.inArray(id, all_id);
                let this_data = rows[idxNum];
                let originPw = this_data['pw'];
                let checkPw = $pwInput.val();

                if(originPw === checkPw) {
                    update();
                } else {
                    alert('비밀번호를 확인해 주세요.');
                    $pwInput.focus();
                    return false
                }
            }

            function update() {
                let image = $imgInput.val();
                let name = $nameInput.val();
                let mbti = $mbtiInput.val();
                let blog = $blogInput.val();
                let comment = $commentInput.val();
                let id = $('.modal-info').data('num');

                let formData = new FormData();

                formData.append("name_give", name);
                formData.append("comment_give", comment);
                formData.append("img_give", image);
                formData.append("mbti_give", mbti);
                formData.append("blog_give", blog);
                formData.append("_id_give", id);

                fetch("/introduce/update", { method: "PUT", body: formData })
                    .then((res) => res.json())
                    .then((data) => {
                        alert(data["msg"]);
                        window.location.reload();
                    });
            };

            //  삭제 
            $(document).on('click', '.del-btn', delete_info);

            function delete_info() {
                let id = $('.modal-info').data('num');
                let all_id = rows.map(rows => rows['_id']);
                let idxNum = $.inArray(id, all_id);
                let this_data = rows[idxNum];
                let originPw = this_data['pw'];

                let checkPw = prompt('비밀번호를 입력해 주세요');

                if (originPw === checkPw) {
                    let formData = new FormData();
    
                    formData.append("_id_give", id);
    
                    let confirmDel = confirm('정말 삭제하시겠습니까?');
    
                    if (confirmDel) {
                        fetch("/introduce/delete", { method: "DELETE", body: formData })
                            .then((res) => res.json())
                            .then((data) => {
                                alert(data["msg"]);
                                window.location.reload();
                            });
                    }
                } else {
                    alert('비밀번호를 확인해 주세요!');
                    return false
                }
            }
        }); //  /fetch
    }
    //  /set_temp

    //  작성
    $('#submit').click(save_check);

    const imgInput = $("#floatingInput1");
    const nameInput = $("#floatingInput2");
    const mbtiInput = $("#floatingInput3");
    const blogInput = $("#floatingInput4");
    const pwInput = $('#floatingInput5');
    const commentInput = $('#floatingTextarea');

    function save_check() {
        if (!imgInput.val()) {
            alert('이미지 URL을 입력해 주세요');
            imgInput.focus();
            return false;
        } else if (!nameInput.val()) {
            alert('이름을 입력해 주세요');
            nameInput.focus();
            return false;
        } else if (!mbtiInput.val()) {
            alert('MBTI를 입력해 주세요');
            mbtiInput.focus();
            return false;
        } else if (!blogInput.val()) {
            alert('블로그 URL을 입력해 주세요');
            blogInput.focus();
            return false;
        } else if (!commentInput.val()) {
            alert('자기소개를 입력해 주세요');
            commentInput.focus();
            return false;
        } else if (!pwInput.val()) {
            alert('비밀번호를 입력해 주세요');
            pwInput.focus();
            return false;
        } else {
            save_info();
        }
    }

    function save_info() {
        let image = imgInput.val();
        let name = nameInput.val();
        let mbti = mbtiInput.val();
        let blog = blogInput.val();
        let comment = commentInput.val();
        let pw = pwInput.val();

        let formData = new FormData();

        formData.append("name_give", name);
        formData.append("comment_give", comment);
        formData.append("img_give", image);
        formData.append("mbti_give", mbti);
        formData.append("blog_give", blog);
        formData.append("pw_give", pw);

        fetch("/introduce/upload", { method: "POST", body: formData })
            .then((res) => res.json())
            .then((data) => {
                alert(data["msg"]);
                window.location.reload();
            });
    }

    
});