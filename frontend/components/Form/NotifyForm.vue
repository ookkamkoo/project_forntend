<template>
    <a-form
        :model="formData"
        name="basic"
        ref="formRef"
        autocomplete="off"
        @finish="handleFinish"
    >
        <a-row>
            <a-col :span="24" :md="12">
                <div class="mx-1 my-1">
                    <label for="ชื่อโปรชั่น"><b>ชื่อประกาศ</b></label>
                    <a-form-item ref="name" name="name">
                        <a-input v-model:value="formData.name" />
                    </a-form-item>
                </div>
            </a-col>
            <a-col :span="12" :md="6">
                <div class="mx-1 my-1">
                    <label for="ประเภท"><b>ลำดับที่</b></label>
                    <a-input-number v-model:value="formData.priority" />
                </div>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="24" class="news-image">
                <label for="ประเภท" class="px-1"><b>รูปภาพข่าวสาร</b></label>
                <div v-if="!ImageText" class="close-image" @click="clearPreviewImage">
                    <CloseCircleOutlined />
                </div>
                <a-upload-dragger
                        v-model:fileList="fileList"
                        name="file"
                        :showUploadList=false
                        class="image-upload"
                        @change="handleChange"
                        @drop="handleDrop"

                    >
                        <div class="image-upload-text">
                            <div v-if="ImageText">
                                <p class="ant-upload-drag-icon">
                                    <inbox-outlined></inbox-outlined>
                                </p>
                                <p class="ant-upload-text">Click or drag file to this area to upload</p>
                                <p class="ant-upload-hint">
                                    โปรดเช็คขนาดไฟล์ในการอัปโหลด ขนาดเเนะนำ 1:1 ไฟล์ PNG JPG JPEG
                                </p>
                            </div>
                        </div>
                        <div v-if="previewImage" class="preview-image-container">
                            <img :src="previewImage" class="preview-image" style="width: 350px;">
                        </div>
                    </a-upload-dragger>
            </a-col>
        </a-row>
        <br>
        <a-row justify="center">
            <a-button @click="props.closeModal()" class="m-1">Cancel</a-button>
            <a-button type="primary" html-type="submit" class="m-1 sky">เพิ่ม</a-button>
        </a-row>
    </a-form>

</template>
<script lang="ts" setup>
    import type { SelectProps } from 'ant-design-vue';
    import { InboxOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
    import { message } from 'ant-design-vue';
    import type { UploadChangeParam } from 'ant-design-vue';
    import { ref, reactive } from 'vue';
    import { Alert } from '../Alert/alertComponent';
    import { createNotifyServices,editNotifyServices } from '~/services/notifyServices';
    import * as Constants from '../Constants/Constants';
    import dayjs from 'dayjs';
    const open = ref<boolean>(true);
    const all = ref(false);

    const fileList = ref([]);
    const previewImage = ref('');
    const ImageText = ref(true);
    const action = ref("create")
    const config = useRuntimeConfig()

    const props = defineProps<{
        closeModal:Function,
        getNews:Function,
        newEdit:object
    }>();

    const handleChange = async (info: UploadChangeParam) => {
        const status = info.file.status;
        const file = info.file.originFileObj; // File object

        if (file instanceof File) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result as string;
                if (base64String) {
                    previewImage.value = base64String;
                    formData.image = base64String;
                }
            };
            ImageText.value = false;
            reader.readAsDataURL(file);
        }
        
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`อัพโหลดรูปภาพเรียบร้อย`);
        }
    };

    const clearPreviewImage = () => {
      previewImage.value = '';
      fileList.value = [];
      ImageText.value = true;
    };

    function handleDrop(e: DragEvent) {
        console.log(e);
    }

    let formData = reactive({
        id: 0,
        name:'',
        priority:1,
        image: null as any
    });

    watch(() => props.newEdit, (newValue:any) => {
        console.log(newValue);
        
        if (newValue) {
            if(newValue.id == undefined){
                console.log('111111111111111');
                action.value ="create";
                formData.id = 0;
                formData.name = '';
                formData.priority = 1;
                formData.image =  null as any
            }else{
                console.log('22222222222222');
                console.log(newValue);
                action.value ="edit";

                formData.id = newValue.id;
                formData.name = newValue.name;
                formData.priority = newValue.priority;
            }
            // iamge
            ImageText.value = false;
            previewImage.value = config.public.serviceUrls +'/'+ newValue.image
        } 
    }, { immediate: true });



    const handleFinish = () => {
        handleSubmit();
    };

    const handleSubmit = async() => {
        
        if(action.value == "create"){
            const data = await createNotifyServices(formData);
            if(data.status == "success"){
                Alert('success','เพิ่มพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getNews();
            }else{
                Alert('error',data.message);
            }
        }else{
            const data = await editNotifyServices(formData);
            if(data.status == "success"){
                Alert('success','เเก้ไขพนักงาน หรือ ผู้ดูเเลระบบเรียบร้อย.')
                props.closeModal()
                props.getNews();
            }else{
                Alert('error',data.message);
            }
        }
    };
</script>

<style>
.preview-image-container{
    position: relative;
}
.close-image {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  cursor: pointer;
  font-size: 25px;
  z-index: 999;
  color:#14b6c9
}
.text-label-turn{
    font-weight: 500;
}
.news-image{
    padding: 0 0.5rem;
}
</style>