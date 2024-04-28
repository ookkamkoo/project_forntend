export const Alert = (status: string,text: string) => {
  if(status == "success"){
    return Modal.success({
      title: 'การดำเนินการเรียบร้อย',
      content: text,
    });
  }else if(status == "error"){
    return Modal.error({
      title: 'เกิดข้อผิดพลาด!',
      content: text,
    });
  }
}