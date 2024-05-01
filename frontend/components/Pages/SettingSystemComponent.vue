<template>
        <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="ทั่วไป">
            <h2>เว็บไซต์</h2>
            <a-form
            :model="formData"
            name="basic"
            :wrapper-col="{ span: 24 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            >
                <a-row>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="Production"><b >Production</b></label>
                        <a-select
                            v-model:value="formData.product"
                            style="width: 100%"
                            :options="Constants.optionsProduct"
                            :disabled="true"
                        ></a-select>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="titleWebsite"><b  class="request">Title website</b></label>
                        <a-form-item 
                            name="titleWebsite"
                            :rules="[{ required: true, message: 'โปรดกรอกชื่อเว็บ!' }]"
                            >
                            <a-input v-model:value="formData.titleWebsite"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="discriptionsWebsite"><b  class="request">Discriptions website</b></label>
                        <a-form-item 
                            ref="discriptionsWebsite" 
                            name="discriptionsWebsite"
                            :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                            >
                            <a-input v-model:value="formData.discriptionsWebsite"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="websiteKeyword"><b  class="request">Website keyword</b></label>
                        <a-form-item 
                            ref="websiteKeyword" 
                            name="websiteKeyword"
                            :rules="[{ required: true, message: 'โปรดกรอกรายละเอียดเว็บ!' }]"
                            >
                            <a-input v-model:value="formData.websiteKeyword"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="websiteUrl"><b  class="request">Website Url</b></label>
                        <a-form-item 
                            ref="websiteUrl" 
                            name="websiteUrl"
                            :rules="[{ required: true, message: 'โปรดกรอกลิงค์เว็บไซต์!' }]"
                            >
                            <a-input v-model:value="formData.websiteUrl"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="line"><b  class="request">Line @</b></label>
                        <a-form-item 
                            ref="websiteLine" 
                            name="websiteLine"
                            :rules="[{ required: true, message: 'โปรดกรอกลิงค์ไลน์!' }]"
                            >
                            <a-input v-model:value="formData.websiteLine"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24" :md="12" class="p-3 my-2">
                        <label for="clearWithdrawMin"><b  class="request">ไอคอนเว็บ ขนาด ( w1 : h1 )</b></label>
                        <div v-if="!ImageText" class="close-image" @click="clearPreviewImage">
                            <CloseCircleOutlined />
                        </div>
                        <a-upload-dragger
                                v-model:fileList="fileList"
                                name="file"
                                :showUploadList=false
                                class="image-upload"
                                @change="handleChange"
                            >
                                <div class="image-upload-text">
                                    <div v-if="ImageText">
                                        <p class="ant-upload-drag-icon">
                                            <inbox-outlined></inbox-outlined>
                                        </p>
                                        <p class="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p class="ant-upload-hint">
                                            โปรดเช็คขนาดไฟล์ในการอัปโหลด ขนาดเเนะนำ w1:h1 ไฟล์ PNG JPG JPEG
                                        </p>
                                    </div>
                                </div>
                                <div v-if="previewImage" class="preview-image-container">
                                    <img :src="previewImage" class="preview-image" style="width: 350px;">
                                </div>
                            </a-upload-dragger>
                    </a-col>

                    <a-col :span="24" :md="12" class="p-3 my-2">
                        <label for="clearWithdrawMin"><b  class="request">โลโก้เว็บ ขนาด ( w3 : h1 ) แนวนอนดีที่สุด</b></label>
                        <div v-if="!ImageTextLogo" class="close-image" @click="clearPreviewImageLogo">
                            <CloseCircleOutlined />
                        </div>
                        <a-upload-dragger
                                v-model:fileList="fileListLogo"
                                name="file"
                                :showUploadList=false
                                class="image-upload"
                                @change="handleChangeLogo"
                            >
                                <div class="image-upload-text">
                                    <div v-if="ImageTextLogo">
                                        <p class="ant-upload-drag-icon">
                                            <inbox-outlined></inbox-outlined>
                                        </p>
                                        <p class="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p class="ant-upload-hint">
                                            โปรดเช็คขนาดไฟล์ในการอัปโหลด ขนาดเเนะนำ w3:h1 ไฟล์ PNG JPG JPEG
                                        </p>
                                    </div>
                                </div>
                                <div v-if="previewImageLogo" class="preview-image-container">
                                    <img :src="previewImageLogo" class="preview-image" style="width: 350px;">
                                </div>
                            </a-upload-dragger>
                    </a-col>
                </a-row>
                <h2>ทั่วไป</h2>
                <a-row>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="clearWithdrawMin"><b  class="request">เคลียยอดเทิร์น</b></label>
                        <a-form-item 
                            ref="clearWithdrawMin" 
                            name="clearWithdrawMin"
                            :rules="[{ required: true, message: 'โปรดกรอกเคลียยอดเทิร์น!' }]"
                            >
                            <a-input v-model:value="formData.clearWithdrawMin"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="turnWithdrawNormal"><b  class="request">ยอดเทิร์นฝากปกติ</b></label>
                        <a-form-item 
                            ref="turnWithdrawNormal" 
                            name="turnWithdrawNormal"
                            :rules="[{ required: true, message: 'โปรดกรอกยอดเทิร์นฝากปกติ!' }]"
                            >
                            <a-input v-model:value="formData.turnWithdrawNormal"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="password"><b class="request">พาสเวิร์ดลูกค้า</b></label>
                        <a-form-item 
                            ref="password" 
                            name="password"
                            :rules="[{ required: true, message: 'โปรดกรอกพาสเวิร์ดลูกค้า!' }]"
                            >
                            <a-input v-model:value="formData.password"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24" :md="24" class="p-3">
                    <b>เเสดงเบอร์โทรศัพท์ลูกค้า</b> 
                    </a-col>
                    <a-col :span="24" :md="24" class="p-3">
                    <a-switch v-model:checked="formData.showUsername" />
                    </a-col>
                </a-row>
                <h2>ระบบสมัครสมาชิก</h2>
                <a-row>
                    <a-col :span="12" :md="12" class="p-3">
                    <b>สถานะการสมัคร</b> 
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                    <b>สถานะดึงชื่อลูกค้า</b> 
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                    <a-switch v-model:checked="formData.registerStatus" />
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                    <a-switch v-model:checked="formData.getNameMember" />
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :md="12" class="p-3">
                    <b>สถานะการจำกัดชื่อ - นามสกุลซ้ำ</b> 
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                    <b>สมัครสมาชิก บัญชีทรูวอเล็ท</b> 
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                    <a-switch v-model:checked="formData.checkName" />
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                    <a-switch v-model:checked="formData.regisTrue" />
                    </a-col>
                </a-row>
                <br>
                <a-row justify="end">
                    <a-button type="primary" class="sky" html-type="submit">บันทึก</a-button>
                </a-row>
            </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="ฝาก - ถอน">
            <h2>ฝากเงิน</h2>
            <a-form
                :model="formData"
                name="basic"
                :wrapper-col="{ span: 24 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-row>
                    <a-col :span="12" :md="12" class="p-3">
                        <a-col :span="24" :md="24">
                        <b>สถานะการฝาก</b> 
                        </a-col>
                        <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.depositStatus" />
                        </a-col>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <a-col :span="24" :md="24">
                        <b>ฝากเงินโดยการทำรายการ</b>
                        </a-col>
                        <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.memberCreateDeposit" />
                        </a-col>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="ฝากเงินขั้นต่ำ"><b  class="request">ฝากเงินขั้นต่ำ</b></label>
                        <a-form-item 
                            ref="depositMin" 
                            name="depositMin"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง ฝากเงินขั้นต่ำ!' }]"
                            >
                            <a-input v-model:value="formData.depositMin"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="ฝากเงินสูงสุด"><b  class="request">ฝากเงินสูงสุด</b></label>
                        <a-form-item 
                            ref="depositMax" 
                            name="depositMax"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง ฝากเงินสูงสุด!' }]"
                            >
                            <a-input v-model:value="formData.depositMax"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" :md="24" class="p-3">
                        <a-col :span="24" :md="24">
                        <b>ค่าธรรมเนียมการฝาก</b> 
                        </a-col>
                        <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.depositFee" />
                        </a-col>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.depositFee">
                        <label for="การเก็บค่าธรรมเนียม"><b class="request">การเก็บค่าธรรมเนียม</b></label>
                        <a-select
                            v-model:value="formData.typeDepositFee"
                            style="width: 100%"
                            :options="Constants.optionsFee"
                        ></a-select>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.depositFee">
                        <label for="ประเภทการคืน"><b class="request">ประเภทการคืน</b></label>
                        <a-select
                            v-model:value="formData.typeDepositFeeAmountOrPerCent"
                            style="width: 100%"
                            :options="Constants.optionsTypeBonus"
                        ></a-select>
                    </a-col>
                    <a-col :span="24" :md="24" class="p-3 p-rl-5" v-if="formData.depositFee">
                        <a-row v-if="formData.typeDepositFee ==  1">
                            <a-col :span="12" :md="12" class="p-3">
                                <label for="ค่าธรรมเนียม"><b class="request">ค่าธรรมเนียม ( {{ Constants.optionsTypeBonus[Number(formData.typeDepositFeeAmountOrPerCent) - 1].label }} )</b></label>
                                <a-form-item 
                                    ref="depostDetailNormal.fee" 
                                    name="depostDetailNormal.fee"
                                    :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียม!' }]"
                                    >
                                    <a-input-number v-model:value="formData.depostDetailNormal.fee"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12" :md="12" class="p-3" v-if="formData.typeDepositFeeAmountOrPerCent == '1'">
                                <label for="ฝากเงินขั้นต่ำ"><b  class="request">ค่าธรรมเนียมสูงสุด</b></label>
                                <a-form-item 
                                    ref="depostDetailNormal.amountMaxFee" 
                                    name="depostDetailNormal.amountMaxFee"
                                    :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียมสูงสุด!' }]"
                                    >
                                    <a-input-number v-model:value="formData.depostDetailNormal.amountMaxFee"/>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row v-if="formData.typeDepositFee ==  2">
                            <a-col v-for="(column, index) in formData.depostDetailScal" :key="index" :span="24" :md="24">
                                <a-row>
                                    <a-col :span="24" :md="3">
                                        <br>
                                        <div class="mx-1 my-1">
                                            <a-button type="primary" class="sky" style="width: 100%;"><b> มากกว่า </b></a-button>
                                        </div>
                                    </a-col>
                                    <a-col :span="24" :md="7">
                                        <div class="mx-1 my-1">
                                            <label for="ฝากเงิน"><b class="request">ฝากเงิน</b></label>
                                            <a-form-item 
                                                ref="column.amount" 
                                                name="column.amount"
                                                :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียม!' }]"
                                                >
                                                <a-input-number v-model:value="column.amount"/>
                                            </a-form-item>
                                        </div>
                                    </a-col>
                                    <a-col :span="24" :md="7">
                                        <div class="mx-1 my-1">
                                            <label for="ค่าธรรมเนียม"><b class="request">ค่าธรรมเนียม ( {{ Constants.optionsTypeBonus[Number(formData.typeDepositFeeAmountOrPerCent) - 1].label }} )</b></label>
                                            <a-form-item 
                                                ref="column.fee" 
                                                name="column.fee"
                                                :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียม!' }]"
                                                >
                                                <a-input-number v-model:value="column.fee"/>
                                            </a-form-item>
                                        </div>
                                    </a-col>
                                    <a-col :span="24" :md="7" v-if="formData.typeDepositFeeAmountOrPerCent == '1'">
                                        <div class="mx-1 my-1">
                                            <label for="ค่าธรรมเนียมสูงสุด"><b class="request">ค่าธรรมเนียมสูงสุด</b></label>
                                            <a-form-item 
                                                ref="column.amountMaxFee" 
                                                name="column.amountMaxFee"
                                                :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียม!' }]"
                                                >
                                                <a-input-number v-model:value="column.amountMaxFee"/>
                                            </a-form-item>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-col :span="24" :md="24">
                                <div class="mx-1 center">
                                    <br>
                                    <a-button class="sky mx-1" type="primary" @click="addColumnScale"><PlusOutlined /></a-button>
                                    <a-button class="danger" type="primary" @click="removeColumnScale()"><CloseOutlined /></a-button>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                
                <h2>ถอนเงิน</h2>
                <a-row>
                    <a-col :span="12" :md="12" class="p-3">
                        <a-col :span="24" :md="24">
                            <b>สถานะถอนเงิน</b> 
                        </a-col>
                        <a-col :span="24" :md="24" >
                            <a-switch v-model:checked="formData.statusWithdraw" />
                        </a-col>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <a-col :span="24" :md="24" >
                        <b>บังคับถอนเงินทั้งหมด</b> 
                        </a-col>
                        <a-col :span="24" :md="24">
                        <a-switch v-model:checked="formData.withdrawAll" />
                        </a-col>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="ถอนเงินขั้นต่ำ"><b  class="request">ถอนเงินขั้นต่ำ</b></label>
                        <a-form-item 
                            ref="withdrawMin" 
                            name="withdrawMin"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง ถอนเงินขั้นต่ำ!' }]"
                            >
                            <a-input v-model:value="formData.withdrawMin"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="ถอนสูงสุดต่อครั้ง"><b  class="request">ถอนสูงสุดต่อครั้ง</b></label>
                        <a-form-item 
                            ref="withdrawMax" 
                            name="withdrawMax"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง ถอนสูงสุดต่อครั้ง!' }]"
                            >
                            <a-input v-model:value="formData.withdrawMax"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="ยอดถอนรวมต่อวัน"><b  class="request">ยอดถอนรวมต่อวัน</b></label>
                        <a-form-item 
                            ref="withdrawMaxDay" 
                            name="withdrawMaxDay"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง ยอดถอนรวมต่อวัน!' }]"
                            >
                            <a-input v-model:value="formData.withdrawMaxDay"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3">
                        <label for="จำนวนรายการถอนต่อวัน"><b  class="request">จำนวนรายการถอนต่อวัน</b></label>
                        <a-form-item 
                            ref="withdrawAround" 
                            name="withdrawAround"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง จำนวนรายการถอนต่อวัน!' }]"
                            >
                            <a-input v-model:value="formData.withdrawAround"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24" :md="24" class="p-3">
                        <a-col :span="24" :md="24">
                        <b>ค่าธรรมเนียมการถอน</b> 
                        </a-col>
                        <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.withdrawFee" />
                        </a-col>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.withdrawFee">
                        <label for="การเก็บค่าธรรมเนียม"><b class="request">การเก็บค่าธรรมเนียม</b></label>
                        <a-select
                            v-model:value="formData.typeWithdrawFee"
                            style="width: 100%"
                            :options="Constants.optionsFee"
                        ></a-select>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.withdrawFee">
                        <label for="ประเภทการคืน"><b class="request">ประเภทการคืน</b></label>
                        <a-select
                            v-model:value="formData.typeWithdrawFeeAmountOrPerCent"
                            style="width: 100%"
                            :options="Constants.optionsTypeBonus"
                        ></a-select>
                    </a-col>
                    <a-col :span="24" :md="24" class="p-3 p-rl-5" v-if="formData.withdrawFee">
                        <a-row v-if="formData.typeWithdrawFee ==  1">
                            <a-col :span="12" :md="12" class="p-3">
                                <label for="ค่าธรรมเนียม"><b class="request">ค่าธรรมเนียม ( {{ Constants.optionsTypeBonus[Number(formData.typeWithdrawFeeAmountOrPerCent) - 1].label }} )</b></label>
                                <a-form-item 
                                    ref="depostDetailNormal.fee" 
                                    name="depostDetailNormal.fee"
                                    :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียม!' }]"
                                    >
                                    <a-input-number v-model:value="formData.depostDetailNormal.fee"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12" :md="12" class="p-3" v-if="formData.typeWithdrawFeeAmountOrPerCent == '1'">
                                <label for="ฝากเงินขั้นต่ำ"><b  class="request">ค่าธรรมเนียมสูงสุด</b></label>
                                <a-form-item 
                                    ref="depostDetailNormal.amountMaxFee" 
                                    name="depostDetailNormal.amountMaxFee"
                                    :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียมสูงสุด!' }]"
                                    >
                                    <a-input-number v-model:value="formData.WithdrawDetailNormal.amountMaxFee"/>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row v-if="formData.typeWithdrawFee ==  2">
                            <a-col v-for="(column, index) in formData.WithdrawDetailScal" :key="index" :span="24" :md="24">
                                <a-row>
                                    <a-col :span="24" :md="3">
                                        <br>
                                        <div class="mx-1 my-1">
                                            <a-button type="primary" class="sky" style="width: 100%;"><b> มากกว่า </b></a-button>
                                        </div>
                                    </a-col>
                                    <a-col :span="24" :md="7">
                                        <div class="mx-1 my-1">
                                            <label for="ฝากเงิน"><b class="request">ฝากเงิน</b></label>
                                            <a-form-item 
                                                ref="column.amount" 
                                                name="column.amount"
                                                :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียม!' }]"
                                                >
                                                <a-input-number v-model:value="column.amount"/>
                                            </a-form-item>
                                        </div>
                                    </a-col>
                                    <a-col :span="24" :md="7">
                                        <div class="mx-1 my-1">
                                            <label for="ค่าธรรมเนียม"><b class="request">ค่าธรรมเนียม ( {{ Constants.optionsTypeBonus[Number(formData.typeWithdrawFeeAmountOrPerCent) - 1].label }} )</b></label>
                                            <a-form-item 
                                                ref="column.fee" 
                                                name="column.fee"
                                                :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียม!' }]"
                                                >
                                                <a-input-number v-model:value="column.fee"/>
                                            </a-form-item>
                                        </div>
                                    </a-col>
                                    <a-col :span="24" :md="7" v-if="formData.typeWithdrawFeeAmountOrPerCent == '1'">
                                        <div class="mx-1 my-1">
                                            <label for="ค่าธรรมเนียมสูงสุด"><b class="request">ค่าธรรมเนียมสูงสุด</b></label>
                                            <a-form-item 
                                                ref="column.amountMaxFee" 
                                                name="column.amountMaxFee"
                                                :rules="[{ required: true, message: 'โปรดกรอกค่าธรรมเนียม!' }]"
                                                >
                                                <a-input-number v-model:value="column.amountMaxFee"/>
                                            </a-form-item>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-col :span="24" :md="24">
                                <div class="mx-1 center">
                                    <br>
                                    <a-button class="sky mx-1" type="primary" @click="addColumnScaleWithdrawFee()"><PlusOutlined /></a-button>
                                    <a-button class="danger" type="primary" @click="removeColumnScaleWithdrawFee()"><CloseOutlined /></a-button>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="24" :md="24" class="p-3">
                        <a-col :span="24" :md="24">
                        <b>ถอนเงินอัตโนมัติ</b> 
                        </a-col>
                        <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.withdrawAuto" />
                        </a-col>
                    </a-col>
                    <a-col :span="24" :md="24" class="p-3">
                        <a-col :span="24" :md="24">
                        <b>โยกเงินอัตโนมัติ</b> 
                        </a-col>
                        <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.tranferAuto" />
                        </a-col>
                    </a-col>
                </a-row>
                <br>
                <a-row justify="end">
                    <a-button type="primary" class="sky" html-type="submit">บันทึก</a-button>
                </a-row>
            </a-form>
        </a-tab-pane>
        <a-tab-pane key="3" tab="ระบบอัตโนมัติ">
            <h2>คืนยอดเสีย</h2>
            <a-form
                :model="formData"
                name="basic"
                :wrapper-col="{ span: 24 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-row>
                <a-col :span="24" :md="24" class="p-3">
                    <a-col :span="24" :md="24">
                        <b>สถานะคืนยอดเสีย</b> 
                    </a-col>
                    <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.refundLost" />
                    </a-col>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="ประเภทการคืน"><b class="request">ประเภทการคืน</b></label>
                    <a-select
                        v-model:value="formData.typeRefundLost"
                        style="width: 100%"
                        :options="Constants.optionsLose"
                    ></a-select>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="เปอร์เซ็นต์"><b class="request">เปอร์เซ็นต์</b></label>
                    <a-form-item 
                        ref="refundLostPercent" 
                        name="refundLostPercent"
                        :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                        >
                        <a-input v-model:value="formData.refundLostPercent"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="เทิร์น"><b class="request">เทิร์น</b></label>
                    <a-form-item 
                        ref="refundLostTurn" 
                        name="refundLostTurn"
                        :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                        >
                        <a-input v-model:value="formData.refundLostTurn"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="วิธีคืนยอดเสียให้ลูกค้า"><b class="request">วิธีคืนยอดเสียให้ลูกค้า</b></label>
                    <a-select
                        v-model:value="formData.typeRefundLostSet"
                        style="width: 100%"
                        :options="Constants.optionsLoseTypeMember"
                    ></a-select>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="คืนต่ำสุด"><b  class="request">คืนต่ำสุด</b></label>
                    <a-form-item 
                        ref="refundLostMin" 
                        name="refundLostMin"
                        :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                        >
                        <a-input v-model:value="formData.refundLostMin"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="คืนสูงสุด"><b  class="request">คืนสูงสุด</b></label>
                    <a-form-item 
                        ref="refundLostMax" 
                        name="refundLostMax"
                        :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                        >
                        <a-input v-model:value="formData.refundLostMax"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="สถานะคืนยอดเสีย"><b class="request">สถานะคืนยอดเสีย</b></label>
                    <a-select
                        v-model:value="formData.typeRefundLostdate"
                        style="width: 100%"
                        :options="Constants.optionsDayOpen"
                    ></a-select>
                </a-col>
                </a-row>
                <a-row v-if="formData.typeRefundLostdate == '2'">
                    <a-col :span="24" :md="12">
                        <div class="select-day">
                            <h3>
                                เลือกวัน
                                <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAllLost">เลือกทั้งหมด</a-checkbox>
                            </h3>
                            <a-checkbox-group v-model:value="formData.optionRefundLostDate" :options="Constants.optionWeek" class="model-week">
                                <template #label="{ label }">
                                    <p>{{ label }}</p>
                                </template>
                            </a-checkbox-group>
                        </div>
                    </a-col>
                </a-row>
                <a-row v-if="formData.typeRefundLostdate == '3'">
                    <a-col :span="24" :md="12">
                        <div class="select-day">
                            <h3>
                                เลือกวันที่
                                <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAllLost">เลือกทั้งหมด</a-checkbox>
                            </h3>
                            <a-checkbox-group v-model:value="formData.optionRefundLostDate" :options="Constants.optionDay" class="model-week">
                                <template #label="{ label }">
                                    <p>{{ label }}</p>
                                </template>
                            </a-checkbox-group>
                        </div>
                    </a-col>
                </a-row>
                <h2>เเนะนำเพื่อน</h2>
                <a-row>
                <a-col :span="24" :md="24" class="p-3">
                    <a-col :span="24" :md="24">
                        <b>สถานะเเนะนำเพื่อน</b> 
                    </a-col>
                    <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.refundLost" />
                    </a-col>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="ประเภทการคืน"><b class="request">ประเภทการคืน</b></label>
                    <a-select
                        v-model:value="formData.typeAffiliate"
                        style="width: 100%"
                        :options="Constants.optionsLose"
                    ></a-select>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="เปอร์เซ็นต์"><b class="request">เปอร์เซ็นต์</b></label>
                    <a-form-item 
                        ref="affiliatePercent" 
                        name="affiliatePercent"
                        :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                        >
                        <a-input v-model:value="formData.affiliatePercent"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="เทิร์น"><b class="request">เทิร์น</b></label>
                    <a-form-item 
                        ref="affiliateTurn" 
                        name="affiliateTurn"
                        :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                        >
                        <a-input v-model:value="formData.affiliateTurn"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="วิธีคืนยอดเสียให้ลูกค้า"><b class="request">วิธีคืนยอดเเนะนำเพื่อน</b></label>
                    <a-select
                        v-model:value="formData.affiliateTypeMemberGet"
                        style="width: 100%"
                        :options="Constants.optionsLoseTypeMember"
                        :disabled="true"
                    ></a-select>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="คืนสูงสุด"><b  class="request">คืนต่ำสุด</b></label>
                    <a-form-item 
                        ref="affiliateMin" 
                        name="affiliateMin"
                        :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                        >
                        <a-input v-model:value="formData.affiliateMin"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="คืนสูงสุด"><b  class="request">คืนสูงสุด</b></label>
                    <a-form-item 
                        ref="affiliateMax" 
                        name="affiliateMax"
                        :rules="[{ required: true, message: 'โปรดกรอกชื่อบัญชี!' }]"
                        >
                        <a-input v-model:value="formData.affiliateMax"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12" :md="12" class="p-3">
                    <label for="สถานะคืนยอดเสีย"><b class="request">สถานะคืนยอดเสีย</b></label>
                    <a-select
                        v-model:value="formData.typeAffiliateDate"
                        style="width: 100%"
                        :options="Constants.optionsDayOpen"
                    ></a-select>
                </a-col>
                </a-row>
                <a-row v-if="formData.typeAffiliateDate == '2'">
                    <a-col :span="24" :md="12">
                        <div class="select-day">
                            <h3>
                                เลือกวัน
                                <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAllAffiliate">เลือกทั้งหมด</a-checkbox>
                            </h3>
                            <a-checkbox-group v-model:value="formData.affiliateDate" :options="Constants.optionWeek" class="model-week">
                                <template #label="{ label }">
                                    <p>{{ label }}</p>
                                </template>
                            </a-checkbox-group>
                        </div>
                    </a-col>
                </a-row>
                <a-row v-if="formData.typeAffiliateDate == '3'">
                    <a-col :span="24" :md="12">
                        <div class="select-day">
                            <h3>
                                เลือกวันที่
                                <a-checkbox v-model:checked="all" style="float: inline-end;" @change="selectAllAffiliate">เลือกทั้งหมด</a-checkbox>
                            </h3>
                            <a-checkbox-group v-model:value="formData.affiliateDate" :options="Constants.optionDay" class="model-week">
                                <template #label="{ label }">
                                    <p>{{ label }}</p>
                                </template>
                            </a-checkbox-group>
                        </div>
                    </a-col>
                </a-row>
                <br>
                <a-row justify="end">
                    <a-button type="primary" class="sky" html-type="submit">บันทึก</a-button>
                </a-row>
            </a-form>
        </a-tab-pane>
        <a-tab-pane key="4" tab="การเเจ้งเตือน">
            <h2>การเเจ้งเตือน</h2>
            <a-form
                :model="formData"
                name="basic"
                :wrapper-col="{ span: 24 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-row>
                    <a-col :span="24" :md="24" class="p-3">
                    <a-col :span="24" :md="24">
                        <b>Line Notification</b> 
                    </a-col>
                    <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.notifyLineStatus" />
                    </a-col>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.notifyLineStatus">
                        <label for="รายงานสรุปรายวัน"><b class="request">รายงานสรุปรายวัน</b></label>
                        <a-form-item 
                            ref="notifyLineSummary" 
                            name="notifyLineSummary"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง รายงานสรุปรายวัน!' }]"
                            >
                            <a-input v-model:value="formData.notifyLineSummary"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.notifyLineStatus">
                        <label for="สมัครสมาชิก"><b class="request">สมัครสมาชิก</b></label>
                        <a-form-item 
                            ref="notifyLineRegismember" 
                            name="notifyLineRegismember"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง สมัครสมาชิก!' }]"
                            >
                            <a-input v-model:value="formData.notifyLineRegismember"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.notifyLineStatus">
                        <label for="แจ้งฝากเงิน"><b class="request">แจ้งฝากเงิน</b></label>
                        <a-form-item 
                            ref="notifyLineDeposit" 
                            name="notifyLineDeposit"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง แจ้งฝากเงิน!' }]"
                            >
                            <a-input v-model:value="formData.notifyLineDeposit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.notifyLineStatus">
                        <label for="แจ้งรายการฝากเงิน"><b class="request">แจ้งรายการฝากเงิน</b></label>
                        <a-form-item 
                            ref="notifyLineDepositList" 
                            name="notifyLineDepositList"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง แจ้งรายการฝากเงิน!' }]"
                            >
                            <a-input v-model:value="formData.notifyLineDepositList"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.notifyLineStatus">
                        <label for="แจ้งถอนเงิน"><b class="request">แจ้งถอนเงิน</b></label>
                        <a-form-item 
                            ref="notifyLineWithdraw" 
                            name="notifyLineWithdraw"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง แจ้งถอนเงิน!' }]"
                            >
                            <a-input v-model:value="formData.notifyLineWithdraw"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="p-3" v-if="formData.notifyLineStatus">
                        <label for="แจ้งรายการถอนเงิน"><b class="request">แจ้งรายการถอนเงิน</b></label>
                        <a-form-item 
                            ref="notifyLineWithdrawList" 
                            name="notifyLineWithdrawList"
                            :rules="[{ required: true, message: 'โปรดกรอกช่อง แจ้งรายการถอนเงิน!' }]"
                            >
                            <a-input v-model:value="formData.notifyLineWithdrawList"/>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :md="12" class="p-3">
                    <a-col :span="24" :md="24">
                        <b>สถานะเสียงแจ้งฝากเงิน</b> 
                    </a-col>
                    <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.notifySoundDepositStatus" />
                    </a-col>
                    </a-col>
                    
                    <a-col :span="12" :md="12" class="p-3">
                    <a-col :span="24" :md="24">
                        <b>สถานะเสียงแจ้งถอน</b> 
                    </a-col>
                    <a-col :span="24" :md="24" >
                        <a-switch v-model:checked="formData.notifySoundWithdrawStatus" />
                    </a-col>
                    </a-col>
                    
                    <a-col :span="12" :md="12" class="p-3">
                        <a-col :span="24" :md="24">
                            <label for="ลิ้งเสียงแจ้งถอน"><b class="request">ลิ้งเสียงแจ้งฝาก</b></label>
                            <a-form-item 
                                ref="notifySoundDeposit" 
                                name="notifySoundDeposit"
                                :rules="[{ required: true, message: 'โปรดกรอกช่อง ลิ้งเสียงแจ้งฝาก!' }]"
                                >
                                <a-input v-model:value="formData.notifySoundDeposit"/>
                            </a-form-item>
                        </a-col>
                    </a-col>

                    <a-col :span="12" :md="12" class="p-3">
                        <a-col :span="24" :md="24">
                            <label for="ลิ้งเสียงแจ้งถอน"><b class="request">ลิ้งเสียงแจ้งถอน</b></label>
                            <a-form-item 
                                ref="notifySoundWithdraw" 
                                name="notifySoundWithdraw"
                                :rules="[{ required: true, message: 'โปรดกรอกช่อง ลิ้งเสียงแจ้งถอน!' }]"
                                >
                                <a-input v-model:value="formData.notifySoundWithdraw"/>
                            </a-form-item>
                        </a-col>
                    </a-col>
                </a-row>
                <br>
                <a-row justify="end">
                    <a-button type="primary" class="sky" html-type="submit">บันทึก</a-button>
                </a-row>
            </a-form>
        </a-tab-pane>
        </a-tabs>
    <br>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { setSetting,getSettingServices } from '~/services/settingService';
  import * as Constants from '../Constants/Constants';
  import { Alert } from '../Alert/alertComponent';

  const all = ref(false);

  const activeKey = ref('1');
  const fileList = ref([]);
  const fileListLogo = ref([]);
  const previewImage = ref('');
  const previewImageLogo = ref('');
  const ImageText = ref(true);
  const ImageTextLogo = ref(true);

  let formData = reactive({
      // page1 
      product: 1,
      titleWebsite:'demo',
      discriptionsWebsite:'คาสิโนออนไลน์ เว็บตรงอันดับ 1 มาใหม่ ฝากถอนไม่มีขั้นต่ำ ครบในเว็บเดียว',
      websiteKeyword:'คาสิโนออนไลน์ เว็บตรงอันดับ 1 มาใหม่ ฝากถอนไม่มีขั้นต่ำ ครบในเว็บเดียว',
      websiteUrl:'',
      websiteLine:'',
      imageWebsite: null as any,
      imageLogoWebsite: null as any,
      clearWithdrawMin:5,
      turnWithdrawNormal:0,
      password: 'asdf123456',
      registerStatus:true,
      showUsername: true,
      getNameMember: false,
      checkName: true,
      regisTrue: false,

      //page 2  
      depositStatus: true,
      memberCreateDeposit: true,
      depositMin: '1',
      depositMax: '50000',
      depositFee:false,
      typeDepositFee:1,
      typeDepositFeeAmountOrPerCent:'1',
      depostDetailNormal:{ fee: 10,amountMaxFee:100 },
      depostDetailScal:[{ amount: 0,fee:10,amountMaxFee:10 },{ amount: 100,fee:5,amountFee:5 },{ amount: 200,fee:1,amountMaxFee:1 }],
      
      statusWithdraw: true,
      withdrawAll: true,
      withdrawMin: 100,
      withdrawMax: 10000,
      withdrawMaxDay: 100000,
      withdrawAround: 20,
      withdrawFee:false,
      typeWithdrawFee:1,
      typeWithdrawFeeAmountOrPerCent:'1',
      WithdrawDetailNormal:{ fee: 10,amountMaxFee:100 },
      WithdrawDetailScal:[{ amount: 0,fee:10,amountMaxFee:10 },{ amount: 100,fee:5,amountMaxFee:5 },{ amount: 200,fee:1,amountMaxFee:1 }],
      withdrawAuto:false,
      tranferAuto:false,
      
      // page 3  
      refundLost:true,
      typeRefundLost:1,
      refundLostPercent:4,
      refundLostTurn:1,
      typeRefundLostSet:1,
      refundLostMin:0,
      refundLostMax:1000,
      typeRefundLostdate:'1',
      optionRefundLostDate: [] as string[],

      affiliate:true,
      typeAffiliate:1,
      affiliatePercent:1,
      affiliateTurn:1,
      affiliateTypeMemberGet:1,
      affiliateMin:0,
      affiliateMax:1000,
      typeAffiliateDate:'1',
      affiliateDate: [] as string[],
      
      // page 4 
      notifyLineStatus:true,
      notifyLineSummary:'',
      notifyLineRegismember:'',
      notifyLineDeposit:'',
      notifyLineDepositList:'',
      notifyLineWithdraw:'',
      notifyLineWithdrawList:'',
      notifySoundDepositStatus:true,
      notifySoundDeposit:'https://assets.mixkit.co/sfx/preview/mixkit-dry-pop-up-notification-alert-2356.mp3',
      notifySoundWithdrawStatus:true,
      notifySoundWithdraw:'https://assets.mixkit.co/sfx/preview/mixkit-dry-pop-up-notification-alert-2356.mp3',
    });

  const handleChange = async (info: UploadChangeParam) => {
      const status = info.file.status;
      const file = info.file.originFileObj; // File object

      if (file instanceof File) {
          const reader = new FileReader();

          reader.onload = () => {
              const base64String = reader.result as string;
              if (base64String) {
                  previewImage.value = base64String;
                  formData.imageWebsite = base64String;
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

  const handleChangeLogo = async (info: UploadChangeParam) => {
      const status = info.file.status;
      const file = info.file.originFileObj; // File object

      if (file instanceof File) {
          const reader = new FileReader();

          reader.onload = () => {
              const base64String = reader.result as string;
              if (base64String) {
                  previewImageLogo.value = base64String;
                  formData.imageLogoWebsite = base64String;
              }
          };
          ImageTextLogo.value = false;
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

  const clearPreviewImageLogo = () => {
    previewImageLogo.value = '';
    fileListLogo.value = [];
    ImageTextLogo.value = true;
  };

  const selectAllLost = () =>{
        if(formData.typeRefundLostdate == '2'){
            if(all.value){
                formData.optionRefundLostDate = ['อา','จ','อ','พ','พฤ','ศ','ส'];
            }else{
                formData.optionRefundLostDate = []
            }
        }else if(formData.typeRefundLostdate == '3'){
            if(all.value){
            formData.optionRefundLostDate = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
            }else{
                formData.optionRefundLostDate = []
            }
        }
    }

    const selectAllAffiliate = () =>{
        if(formData.typeAffiliateDate == '2'){
            if(all.value){
                formData.affiliateDate = ['อา','จ','อ','พ','พฤ','ศ','ส'];
            }else{
                formData.affiliateDate = []
            }
        }else if(formData.typeAffiliateDate == '3'){
            if(all.value){
            formData.affiliateDate = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
            }else{
                formData.affiliateDate = []
            }
        }
    }

    const onFinish = async() => {
        const data = await setSetting(formData,activeKey.value);
        if(data.status == "success"){
            Alert('success','เเก้ไขการตั้งค่า เรียบร้อย.')
        }else{
            Alert('error',data.message);
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        Alert("error","กรุณากรอกข้อมูลให้ครบ!!")
    };

    const addColumnScale = () => {
        formData.depostDetailScal.push({ amount: 0, fee: 0, amountMaxFee: 0 });
    };

    const removeColumnScale = () => {
        formData.depostDetailScal.pop();
    };

    const addColumnScaleWithdrawFee = () => {
        formData.WithdrawDetailScal.push({ amount: 0, fee: 0, amountMaxFee: 0 });
    };

    const removeColumnScaleWithdrawFee  = () => {
        formData.WithdrawDetailScal.pop();
    };

    const getSetting = async() =>{
        const data = await getSettingServices();
        if (data.status === "success") {
            // page 1 
            formData.product = parseInt(data.data.product)
            formData.titleWebsite = data.data.title
            formData.discriptionsWebsite = data.data.description
            formData.websiteKeyword = data.data.keyword
            formData.websiteUrl = data.data.websiteUrl
            formData.websiteLine = data.data.websiteLine
            formData.clearWithdrawMin = parseInt(data.data.clearWithdrawMin)
            formData.turnWithdrawNormal = parseInt(data.data.turnWithdrawNormal)
            formData.password = data.data.passwordCustomer
            formData.registerStatus = data.data.registerStatus=='true'?true:false
            formData.showUsername = data.data.showUsername=='true'?true:false
            formData.getNameMember = data.data.getName=='true'?true:false
            formData.checkName = data.data.checkDuplicateName=='true'?true:false
            formData.regisTrue = data.data.registerTruewallet=='true'?true:false
            
            if(data.data.imageWebsite != ''){
                previewImage.value = data.data.imageWebsite;
                ImageText.value = false;
            }
            if(data.data.imageLogoWebsite != ''){
                previewImageLogo.value = data.data.imageLogoWebsite;
                ImageTextLogo.value = false;
            }

            // page 2
            formData.depositStatus = data.data.depositStatus=='true'?true:false
            formData.memberCreateDeposit = data.data.memberCreateDeposit=='true'?true:false
            formData.depositMin = data.data.depositMin
            formData.depositMax = data.data.depositMax
            formData.depositFee = data.data.depositFee=='true'?true:false
            formData.typeDepositFee = parseInt(data.data.typeDepositFee)
            formData.typeDepositFeeAmountOrPerCent = data.data.typeDepositFeeAmountOrPerCent
            if(parseInt(data.data.typeDepositFee) == 1){
                formData.depostDetailNormal = data.data.depostDetail
            }else{
                formData.depostDetailScal = data.data.depostDetail
            }

            formData.statusWithdraw = data.data.withdrawStatus=='true'?true:false
            formData.withdrawAll = data.data.withdrawAll=='true'?true:false
            formData.withdrawMin = data.data.withdrawMin
            formData.withdrawMax = data.data.withdrawMaxDay
            formData.withdrawMaxDay = data.data.withdrawMaxDay
            formData.withdrawAround = data.data.withdrawAround
            formData.withdrawFee = data.data.withdrawFee=='true'?true:false
            formData.typeWithdrawFee = data.data.typeWithdrawFee
            formData.typeWithdrawFeeAmountOrPerCent = data.data.typeWithdrawFeeAmountOrPerCent
            formData.withdrawAuto = data.data.tranferAuto=='true'?true:false

            if(parseInt(data.data.typeDepositFee) == 1){
                formData.WithdrawDetailNormal = data.data.withdrawDetail
            }else{
                formData.WithdrawDetailScal = data.data.withdrawAuto
            }

            // page 3
            formData.refundLost = data.data.refundLost=='true'?true:false
            formData.typeRefundLost = data.data.typeRefundLost
            formData.refundLostPercent = data.data.refundLostPercent
            formData.refundLostTurn = data.data.typeRefundLostSet
            formData.typeRefundLostSet = data.data.refundLostTurn
            formData.refundLostMin = data.data.refundLostMin
            formData.refundLostMax = data.data.refundLostMax
            formData.typeRefundLostdate = data.data.typeRefundLostdate
            formData.optionRefundLostDate = data.data.refundLostdate
            
            formData.affiliate = data.data.affiliate=='true'?true:false
            formData.typeAffiliate = data.data.typeAffiliate
            formData.affiliatePercent = data.data.affiliatePercent
            formData.affiliateTurn = data.data.affiliateTurn
            formData.affiliateMin = data.data.affiliateMin
            formData.affiliateMax = data.data.affiliateMax
            formData.typeAffiliateDate = data.data.typeAffiliateDate
            formData.affiliateDate = data.data.affiliateDate

            // page 4
            formData.notifyLineStatus = data.data.notifyLineStatus=='true'?true:false
            formData.notifyLineSummary = data.data.notifyLineSummary
            formData.notifyLineRegismember = data.data.notifyLineRegismember
            formData.notifyLineDeposit = data.data.notifyLineDeposit
            formData.notifyLineDepositList = data.data.notifyLineDepositList
            formData.notifyLineWithdraw = data.data.notifyLineWithdraw
            formData.notifyLineWithdrawList = data.data.notifyLineWithdrawList
            formData.notifySoundDepositStatus = data.data.notifySoundDepositStatus=='true'?true:false
            formData.notifySoundDeposit = data.data.notifySoundDeposit
            formData.notifySoundWithdrawStatus = data.data.notifySoundWithdrawStatus=='true'?true:false
            formData.notifySoundWithdraw = data.data.notifySoundWithdraw

        } else {
            Alert('error', data.message);
        }
    }

    onMounted(() => {
        getSetting();
    });

  </script>
  <style>
  .preview-image-container{
      position: relative;
  }
  .close-image {
    position: absolute;
    top: 2rem;
    right: 1rem;
    cursor: pointer;
    font-size: 25px;
    z-index: 999;
    color:#14b6c9
  }
  .text-label-turn{
      font-weight: 500;
  }
  </style>