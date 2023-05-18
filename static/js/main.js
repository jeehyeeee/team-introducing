$(function () {
    set_members();

    function set_members() {
        fetch("/introduce/read")
            .then((res) => res.json())
            .then((data) => {
                let rows = data["result"];

                $(".member-cards").remove();

                rows.forEach((a) => {
                    let image = a["img"];
                    let name = a["name"];
                    let comment = a["comment"];
                    let _id = a["_id"];

                    let temp_html = `<div class="col-3 member-cards" data-num="${_id}">
                          <div class="card shadow-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <img src="${image}" class="card-img-top" alt="멤버 사진" />
                            <div class="card-body">
                              <h5 class="card-title">${name}</h5>
                            </div>
                          </div>
                        </div>`;
                    $("#pills-members .row").prepend(temp_html);
                });

                $(".member-cards").click(function () {
                    let id = $(this).data("num");

                    $(".modal-info").attr("data-num", id);

                    let all_id = rows.map((rows) => rows["_id"]);

                    let idxNum = $.inArray(id, all_id);

                    let this_data = rows[idxNum];

                    let modal_name = this_data["name"];
                    let modal_image = this_data["img"];
                    let modal_comment = this_data["comment"];
                    let modal_mbti = this_data["mbti"];
                    let modal_blog = this_data["blog"];

                    $(".content-img").attr("src", modal_image);
                    $(".content-name").text(modal_name);
                    $(".content-mbti").text(modal_mbti);
                    $(".content-blog").attr("href", modal_blog);
                    $(".content-comment").text(modal_comment);
                });

                //  수정하기 관련
                $(document).on("click", ".edit-btn", function () {
                    let id = $(".modal-info").data("num");

                    let all_id = rows.map((rows) => rows["_id"]);

                    let idxNum = $.inArray(id, all_id);

                    let this_data = rows[idxNum];

                    let modal_name = this_data["name"];
                    let modal_image = this_data["img"];
                    let modal_comment = this_data["comment"];
                    let modal_mbti = this_data["mbti"];
                    let modal_blog = this_data["blog"];

                    $(".change-modal").empty();

                    let temp_modal = `
                        <div class="modal-header">
                          <h5 class="m-0">게시글 수정하기</h5>

                        </div>
                        <div class="modal-body">
                          <div class="form-floating mb-2">
                            <input type="text" class="form-control image" id="floatingInput1-2" placeholder="이미지 URL" value="${modal_image}"/>
                            <label for="floatingInput1">이미지 URL</label>
                          </div>
                          <div class="form-floating mb-2">
                            <input type="text" class="form-control name" id="floatingInput2-2" placeholder="이름" value="${modal_name}"/>
                            <label for="floatingInput2">이름</label>
                          </div>
                          <div class="form-floating mb-2">
                            <input type="text" class="form-control mbti" id="floatingInput3-2" placeholder="이름" value="${modal_mbti}"/>
                            <label for="floatingInput2">MBTI</label>
                          </div>
                          <div class="form-floating mb-2">
                            <input type="text" class="form-control blog" id="floatingInput4-2" placeholder="이름" value="${modal_blog}" />
                            <label for="floatingInput2">블로그 주소</label>
                          </div>
                          <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here"
                              id="floatingTextarea-2">${modal_comment}</textarea>
                            <label for="floatingTextarea">소개 작성하기</label>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary edit-cancel">
                            취소
                          </button>
                          <button type="button" class="btn btn-primary" id="update">저장</button>
                        </div>
                          `;

                    $(".change-modal").append(temp_modal);

                    //  수정 모달에서 취소, X 버튼
                    $(".edit-cancel").click(re_temp_modal);
                    // $(document).on('click', '.edit-cancel', re_temp_modal);
                    $(document).on("click", ".exit-edit", re_temp_modal);
                    // $(document).on('click','#exampleModal', re_temp_modal);

                    function re_temp_modal() {
                        let id = $(".modal-info").data("num");

                        let all_id = rows.map((rows) => rows["_id"]);

                        let idxNum = $.inArray(id, all_id);

                        let this_data = rows[idxNum];

                        let modal_name = this_data["name"];
                        let modal_image = this_data["img"];
                        let modal_comment = this_data["comment"];
                        let modal_mbti = this_data["mbti"];
                        let modal_blog = this_data["blog"];

                        $(".change-modal").empty();

                        let re_temp_modal = `
                              <div class="modal-header d-flex justify-content-end align-items-center">
                                <button type="button" class="border-0 edit-btn" title="수정">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil"
                                    viewBox="0 0 16 16">
                                    <path
                                      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                  </svg>
                                </button>
                                <button type="button" class="border-0 del-btn" title="삭제">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
                                    viewBox="0 0 16 16">
                                    <path
                                      d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                  </svg>
                                </button>
                              </div>
                              <div class="modal-body">
                                <img
                                  src="${modal_image}"
                                  class="card-img-top content-img" alt="..." />
                                <div class="contents-box">
                                  <p class="contents content-name">
                                    ${modal_name}
                                  </p>
                                  <p class="contents content-mbti">
                                    ${modal_mbti}
                                  </p>
                                  <a class="contents content-blog d-block mb-3" href="${modal_blog}">
                                    블로그
                                  </a>
                                  <p class="contents content-comment">
                                    ${modal_comment}
                                  </p>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                  Close
                                </button>
                              </div>
                              `;

                        $(".change-modal").append(re_temp_modal);
                    }

                    //  수정하기 클릭
                    $("#update").click(edit_check);

                    const $imgInput = $("#floatingInput1-2");
                    const $nameInput = $("#floatingInput2-2");
                    const $mbtiInput = $("#floatingInput3-2");
                    const $blogInput = $("#floatingInput4-2");
                    const $commentInput = $("#floatingTextarea-2");

                    function edit_check() {
                        if (!$imgInput.val()) {
                            alert("이미지URL을 입력해 주세요");
                            $imgInput.focus();
                            return false;
                        } else if (!$nameInput.val()) {
                            alert("이름을 입력해 주세요");
                            $nameInput.focus();
                            return false;
                        } else if (!$mbtiInput.val()) {
                            alert("MBTI를 입력해 주세요");
                            $mbtiInput.focus();
                            return false;
                        } else if (!$blogInput.val()) {
                            alert("블로그 URL을 입력해 주세요");
                            $blogInput.focus();
                            return false;
                        } else if (!$commentInput.val()) {
                            alert("자기소개를 입력해 주세요");
                            $commentInput.focus();
                            return false;
                        } else {
                            update();
                        }
                    }

                    function update() {
                        let image = $imgInput.val();
                        let name = $nameInput.val();
                        let mbti = $mbtiInput.val();
                        let blog = $blogInput.val();
                        let comment = $commentInput.val();

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
                    }
                });
            });
    }
    //  /set_temp

    //  작성
    $("#submit").click(save_check);

    const imgInput = $("#floatingInput1");
    const nameInput = $("#floatingInput2");
    const mbtiInput = $("#floatingInput3");
    const blogInput = $("#floatingInput4");
    const commentInput = $("#floatingTextarea");

    function save_check() {
        if (!imgInput.val()) {
            alert("이미지 URL을 입력해 주세요");
            imgInput.focus();
            return false;
        } else if (!nameInput.val()) {
            alert("이름을 입력해 주세요");
            nameInput.focus();
            return false;
        } else if (!mbtiInput.val()) {
            alert("MBTI를 입력해 주세요");
            mbtiInput.focus();
            return false;
        } else if (!blogInput.val()) {
            alert("블로그 URL을 입력해 주세요");
            blogInput.focus();
            return false;
        } else if (!commentInput.val()) {
            alert("자기소개를 입력해 주세요");
            commentInput.focus();
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

        let formData = new FormData();

        formData.append("name_give", name);
        formData.append("comment_give", comment);
        formData.append("img_give", image);
        formData.append("mbti_give", mbti);
        formData.append("blog_give", blog);

        fetch("/introduce/upload", { method: "POST", body: formData })
            .then((res) => res.json())
            .then((data) => {
                alert(data["msg"]);
                window.location.reload();
            });
    }

    //  삭제
    $(document).on("click", ".del-btn", delete_info);

    function delete_info() {
        let id = $(".modal-info").data("num");

        let formData = new FormData();

        formData.append("_id_give", id);

        let confirmDel = confirm("정말 삭제하시겠습니까?");

        if (confirmDel) {
            fetch("/introduce/delete", { method: "DELETE", body: formData })
                .then((res) => res.json())
                .then((data) => {
                    alert(data["msg"]);
                    window.location.reload();
                });
        }
    }
});