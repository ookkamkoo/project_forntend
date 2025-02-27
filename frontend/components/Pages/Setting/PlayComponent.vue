<template>
    <a-tabs v-model:activeKey="activeKey" type="card" @change="changeTab">
        <a-tab-pane key="1" tab="Navbar">
        </a-tab-pane>
        <a-tab-pane key="2" tab="Menubar">
        </a-tab-pane>
        <a-tab-pane key="3" tab="Sidebar">
        </a-tab-pane>
        <a-tab-pane key="7" tab="SidebarB">
        </a-tab-pane>
        <a-tab-pane key="4" tab="ข่าวสาร">
        </a-tab-pane>
        <a-tab-pane key="5" tab="Popup">
        </a-tab-pane>
        <a-tab-pane key="6" tab="ข้อมูล">
        </a-tab-pane>
        <a-tab-pane key="8" tab="กิจกรรม">
        </a-tab-pane>
        <a-tab-pane key="9" tab="เเถบ footter">
        </a-tab-pane>
        <a-tab-pane key="10" tab="footter">
        </a-tab-pane>
        <a-tab-pane key="11" tab="ขอบ">
        </a-tab-pane>
        <a-tab-pane key="12" tab="ปุ่มเข้าใช้งาน">
        </a-tab-pane>
        <a-tab-pane key="13" tab="ตั้งค่าอื่นๆ">
        </a-tab-pane>
    </a-tabs>
    <div v-if="activeKey=='1'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>Navbar</h4>
                <h4>ตำเเหน่ง</h4>
                <div>
                </div>
                <div v-if="formData.selectedGradientNavbar" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientNavbar }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientNavbar"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>

        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(1)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='2'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>MenuBar</h4>
                <div v-if="formData.selectedGradientMenuBar" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientMenuBar }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>

                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientMenuBar"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(2)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='3'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>Sidebar</h4>
                <div v-if="formData.selectedGradientSideBar" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientSideBar }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientSideBar"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(3)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='4'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>ข่าวสาร</h4>
                <div v-if="formData.selectedGradientNewIndex" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientNewIndex }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientNewIndex"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(4)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='5'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>Popup</h4>
                <div v-if="formData.selectedGradientPopup" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientPopup }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientPopup"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(5)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='6'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>Information</h4>
                <div v-if="formData.selectedGradientInformation" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientInformation }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientInformation"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(6)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='7'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>Sidebar Button</h4>
                <div v-if="formData.selectedGradientSideBarButtom" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientSideBarButtom }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientSideBarButtom"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(7)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='8'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>กิจกรรม</h4>
                <div v-if="formData.selectedGradientActivity" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientActivity }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientActivity"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(8)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='9'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>กิจกรรม</h4>
                <div v-if="formData.selectedGradientNavFooter" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientNavFooter }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientNavFooter"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(9)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='10'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>กิจกรรม</h4>
                <div v-if="formData.selectedGradientFooter" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientFooter }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientFooter"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(10)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='11'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>กิจกรรม</h4>
                <div v-if="formData.selectedGradientBorder" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientBorder }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientBorder"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(11)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-else-if="activeKey=='12'">
        <a-row>
            <a-col :span="24" :md="24">
                <h4>กิจกรรม</h4>
                <div v-if="formData.selectedGradientButton" class="selected-gradient p-2">
                    <div class="gradient-bar" :style="{ background: formData.selectedGradientButton }"></div>
                    <!-- <p>{{ selectedGradient }}</p> -->
                </div>
                <h4>โทนสว่าง</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in lightNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>โทนปกติ</h4>
                <div class="gradient-buttons  p-2">
                    <button 
                        v-for="(gradient, index) in sidebarNeutralGradients" 
                        :key="index"
                        :style="{ background: gradient.lg }"
                        class="gradient-button"
                        @click="selectGradient(gradient)"
                    ></button>
                </div>
                
                <h4>โทนมืด</h4>
                <div class="gradient-buttons p-2">
                    <button 
                    v-for="(gradient, index) in darkNavGradients" 
                    :key="index"
                    :style="{ background: gradient.lg }"
                    class="gradient-button"
                    @click="selectGradient(gradient)"
                    ></button>
                </div>

                <h4>องศาของสี</h4>
                <div class="p-2">
                    <a-slider id="test" v-model:value="degree" :min="0" :max="360" style="max-width: 240px;" @change="angleChange"/>
                </div>
                <h4>กำหนดเอง</h4>
                <div class="p-2">
                    <p>กำหนดเองได้ที่ลิงค์ : <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">https://cssgradient.io</a></p>
                    <p>coppy มาเเค่ : linear-gradient(0deg, rgba(34,195,157,1) 0%, rgba(253,187,45,1) 100%)</p>
                    <a-textarea
                        v-model:value="formData.selectedGradientButton"
                        placeholder="Autosize height with minimum and maximum number of lines"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                        style="max-width: 500px;"
                    />
                </div>
            </a-col>
        </a-row>
        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(12)">บันทึก</a-button>
        </a-row>
    </div>
    <div v-if="activeKey=='13'">
        <a-row>
            <a-col :span="24" :md="12">
                <h4>สีข้อความ</h4>
                <a-row>
                    <div style="width: 100px;">
                        <a-input v-model:value="formData.text" type="color" class="input-color"/>
                    </div>
                </a-row>
            </a-col>
        </a-row>

        <a-row justify="end">
            <a-button type="primary" html-type="submit" class="m-1 sky" @click="saveSettingGame(13)">บันทึก</a-button>
        </a-row>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { getSettingThemeServices,saveSettingThemeServices } from '~/services/settingThemeService';
  import { Alert } from '../../Alert/alertComponent';
  interface GradientInterface {
    lg: string;
    angle: string;
    color1: string;
    color2: string;
    color3?: string; // Optional
    }

    const activeKey = ref('1');
    const degree = ref(90);
    var gradientValue = ref<GradientInterface>({
        lg: 'linear-gradient(90deg, #f8f9fa, #e9ecef)',
        angle: '90deg',
        color1: '#f8f9fa',
        color2: '#e9ecef'
    });

    const lightNavGradients = ref<GradientInterface[]>([
        { lg: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', angle: '135deg', color1: '#f8f9fa', color2: '#e9ecef' }, // Soft Gray
        { lg: 'linear-gradient(45deg, #f6d365, #fda085, #fbc2eb)', angle: '45deg', color1: '#f6d365', color2: '#fda085', color3: '#fbc2eb' }, // Orange - Gold - Pink
        { lg: 'linear-gradient(120deg, #ffecd2, #fcb69f)', angle: '120deg', color1: '#ffecd2', color2: '#fcb69f' }, // Peach - Soft Orange
        { lg: 'linear-gradient(93deg, #2f0b06bd, #000000a6)', angle: '93deg', color1: '#ffecd2', color2: '#fcb69f' }, // Peach - Soft Orange
        { lg: 'linear-gradient(60deg, #fbc2eb, #a6c1ee, #4facfe)', angle: '60deg', color1: '#fbc2eb', color2: '#a6c1ee', color3: '#4facfe' }, // Pink - Light Purple - Blue
        { lg: 'linear-gradient(180deg, #ffffff, #e0eafc)', angle: '180deg', color1: '#ffffff', color2: '#e0eafc' }, // White - Light Blue
        { lg: 'linear-gradient(160deg, #fff1eb, #ace0f9, #92fe9d)', angle: '160deg', color1: '#fff1eb', color2: '#ace0f9', color3: '#92fe9d' }, // Soft Blue - Green
        { lg: 'linear-gradient(75deg, #d4fc79, #96e6a1)', angle: '75deg', color1: '#d4fc79', color2: '#96e6a1' }, // Green - Yellow
        { lg: 'linear-gradient(195deg, #fdfbfb, #ebedee, #ff9a9e)', angle: '195deg', color1: '#fdfbfb', color2: '#ebedee', color3: '#ff9a9e' }, // Ultra Light Gray - Soft Pink
        { lg: 'linear-gradient(30deg, #e3fdfd, #ffe6fa)', angle: '30deg', color1: '#e3fdfd', color2: '#ffe6fa' }, // Soft Pastel
        { lg: 'linear-gradient(145deg, #ff9a9e, #fad0c4)', angle: '145deg', color1: '#ff9a9e', color2: '#fad0c4' }, // Soft Pink
        { lg: 'linear-gradient(110deg, #ffdde1, #ee9ca7)', angle: '110deg', color1: '#ffdde1', color2: '#ee9ca7' }, // Light Coral
        { lg: 'linear-gradient(200deg, #ffe259, #ffa751, #ff6a88)', angle: '200deg', color1: '#ffe259', color2: '#ffa751', color3: '#ff6a88' }, // Yellow - Orange - Red
        { lg: 'linear-gradient(240deg, #e0c3fc, #8ec5fc)', angle: '240deg', color1: '#e0c3fc', color2: '#8ec5fc' }, // Light Purple - Blue
        { lg: 'linear-gradient(90deg, #ff6a88, #ff99ac, #fad0c4)', angle: '90deg', color1: '#ff6a88', color2: '#ff99ac', color3: '#fad0c4' }, // Soft Red - Pink
        { lg: 'linear-gradient(170deg, #92fe9d, #00c9ff)', angle: '170deg', color1: '#92fe9d', color2: '#00c9ff' }, // Green - Aqua
        { lg: 'linear-gradient(80deg, #4facfe, #00f2fe, #8ec5fc)', angle: '80deg', color1: '#4facfe', color2: '#00f2fe', color3: '#8ec5fc' }, // Light Blue - Sky Blue
        { lg: 'linear-gradient(45deg, #a8edea, #fed6e3)', angle: '45deg', color1: '#a8edea', color2: '#fed6e3' }, // Mint - Pink
        { lg: 'linear-gradient(195deg, #fdfcfb, #e2d1c3)', angle: '195deg', color1: '#fdfcfb', color2: '#e2d1c3' }, // Beige - Light Brown
        { lg: 'linear-gradient(250deg, #f3e7e9, #e3eeff, #d9a7c7)', angle: '250deg', color1: '#f3e7e9', color2: '#e3eeff', color3: '#d9a7c7' }, // Soft Pink - Blue - Rose
        { lg: 'linear-gradient(135deg, #ffefba, #ffffff)', angle: '135deg', color1: '#ffefba', color2: '#ffffff' }, // Cream - White
        { lg: 'linear-gradient(175deg, #ffdde1, #ff9a9e, #ffd194)', angle: '175deg', color1: '#ffdde1', color2: '#ff9a9e', color3: '#ffd194' }, // Soft Red - Orange
        { lg: 'linear-gradient(200deg, #b6fbff, #83a4d4)', angle: '200deg', color1: '#b6fbff', color2: '#83a4d4' }, // Blue Frost
        { lg: 'linear-gradient(120deg, #e0eafc, #cfdef3, #4b6cb7)', angle: '120deg', color1: '#e0eafc', color2: '#cfdef3', color3: '#4b6cb7' }, // Ice Blue - Navy Blue
        { lg: 'linear-gradient(145deg, #f7f7f7, #ffffff)', angle: '145deg', color1: '#f7f7f7', color2: '#ffffff' }, // White Pure
        { lg: 'linear-gradient(90deg, #f9d29d, #ffd194, #ffecd2)', angle: '90deg', color1: '#f9d29d', color2: '#ffd194', color3: '#ffecd2' }, // Soft Orange - Peach
        { lg: 'linear-gradient(105deg, #d3f8e2, #e4c1f9, #ffb3c6)', angle: '105deg', color1: '#d3f8e2', color2: '#e4c1f9', color3: '#ffb3c6' }, // Pastel Green - Purple - Pink
        { lg: 'linear-gradient(250deg, #deecdd, #a9c5a0)', angle: '250deg', color1: '#deecdd', color2: '#a9c5a0' }, // Light Green - Olive
        { lg: 'linear-gradient(175deg, #a1c4fd, #c2e9fb)', angle: '175deg', color1: '#a1c4fd', color2: '#c2e9fb' }, // Soft Blue Sky
        { lg: 'linear-gradient(210deg, #a8c0ff, #3f2b96)', angle: '210deg', color1: '#a8c0ff', color2: '#3f2b96' }, // Light Blue - Deep Purple
        { lg: 'linear-gradient(60deg, #ff758c, #ff7eb3)', angle: '60deg', color1: '#ff758c', color2: '#ff7eb3' }, // Pink - Light Red
        { lg: 'linear-gradient(145deg, #b3ffab, #12fff7)', angle: '145deg', color1: '#b3ffab', color2: '#12fff7' }, // Green - Aqua
        { lg: 'linear-gradient(175deg, #fc00ff, #00dbde)', angle: '175deg', color1: '#fc00ff', color2: '#00dbde' }, // Purple - Cyan
        { lg: 'linear-gradient(135deg, #fdbb2d, #3a1c71)', angle: '135deg', color1: '#fdbb2d', color2: '#3a1c71' }, // Orange - Purple
        { lg: 'linear-gradient(90deg, #ff9a9e, #fad0c4, #a1c4fd)', angle: '90deg', color1: '#ff9a9e', color2: '#fad0c4', color3: '#a1c4fd' }, // Pink - Soft Blue
        { lg: 'linear-gradient(45deg, #16a085, #f4d03f)', angle: '45deg', color1: '#16a085', color2: '#f4d03f' }, // Teal - Yellow
        { lg: 'linear-gradient(200deg, #ff4e50, #f9d423)', angle: '200deg', color1: '#ff4e50', color2: '#f9d423' }, // Red - Orange
        { lg: 'linear-gradient(80deg, #06beb6, #48b1bf)', angle: '80deg', color1: '#06beb6', color2: '#48b1bf' }, // Teal - Light Blue
        { lg: 'linear-gradient(135deg, #43cea2, #185a9d)', angle: '135deg', color1: '#43cea2', color2: '#185a9d' }, // Green - Blue
    ]);


    const sidebarNeutralGradients = ref<GradientInterface[]>([
        { lg: 'linear-gradient(90deg, #FFF700, #FFD700, #FFA500)', angle: '90deg', color1: '#FFF700', color2: '#FFD700', color3: '#FFA500' },
        { lg: 'linear-gradient(90deg,#ffd70080,#ffbf00,#ffd70080)', angle: '90deg', color1: '#ffd70080', color2: '#ffbf00', color3: '#ffd70080' },
        { lg: 'linear-gradient(120deg, #1a1a1a, #414141)', angle: '120deg', color1: '#1a1a1a', color2: '#414141' },
        { lg: 'linear-gradient(130deg, #ff5733, #c70039)', angle: '130deg', color1: '#ff5733', color2: '#c70039' },
        { lg: 'linear-gradient(140deg, #900c3f, #581845)', angle: '140deg', color1: '#900c3f', color2: '#581845' },
        { lg: 'linear-gradient(150deg, #1b1b1b, #4e4e50, #808080)', angle: '150deg', color1: '#1b1b1b', color2: '#4e4e50', color3: '#808080' },
        { lg: 'linear-gradient(160deg, #3498db, #2ecc71)', angle: '160deg', color1: '#3498db', color2: '#2ecc71' },
        { lg: 'linear-gradient(170deg, #f1c40f, #e67e22)', angle: '170deg', color1: '#f1c40f', color2: '#e67e22' },
        { lg: 'linear-gradient(180deg, #2c3e50, #bdc3c7)', angle: '180deg', color1: '#2c3e50', color2: '#bdc3c7' },
        { lg: 'linear-gradient(190deg, #8e44ad, #c0392b, #f39c12)', angle: '190deg', color1: '#8e44ad', color2: '#c0392b', color3: '#f39c12' },
        { lg: 'linear-gradient(200deg, #16a085, #1abc9c)', angle: '200deg', color1: '#16a085', color2: '#1abc9c' },
        { lg: 'linear-gradient(210deg, #d35400, #e74c3c)', angle: '210deg', color1: '#d35400', color2: '#e74c3c' },
        { lg: 'linear-gradient(220deg, #27ae60, #2ecc71, #52be80)', angle: '220deg', color1: '#27ae60', color2: '#2ecc71', color3: '#52be80' },
        { lg: 'linear-gradient(230deg, #2980b9, #6dd5fa)', angle: '230deg', color1: '#2980b9', color2: '#6dd5fa' },
        { lg: 'linear-gradient(240deg, #e84393, #fd79a8)', angle: '240deg', color1: '#e84393', color2: '#fd79a8' },
        { lg: 'linear-gradient(250deg, #7f8c8d, #95a5a6)', angle: '250deg', color1: '#7f8c8d', color2: '#95a5a6' },
        { lg: 'linear-gradient(260deg, #34495e, #2c3e50, #1c2833)', angle: '260deg', color1: '#34495e', color2: '#2c3e50', color3: '#1c2833' },
        { lg: 'linear-gradient(270deg, #ff9ff3, #f368e0)', angle: '270deg', color1: '#ff9ff3', color2: '#f368e0' },
        { lg: 'linear-gradient(280deg, #10ac84, #1dd1a1)', angle: '280deg', color1: '#10ac84', color2: '#1dd1a1' },
        { lg: 'linear-gradient(290deg, #ff6b6b, #ee5253)', angle: '290deg', color1: '#ff6b6b', color2: '#ee5253' },
        { lg: 'linear-gradient(300deg, #8395a7, #576574, #222f3e)', angle: '300deg', color1: '#8395a7', color2: '#576574', color3: '#222f3e' },
        { lg: 'linear-gradient(310deg, #dfe6e9, #b2bec3)', angle: '310deg', color1: '#dfe6e9', color2: '#b2bec3' },
        { lg: 'linear-gradient(320deg, #55efc4, #00cec9)', angle: '320deg', color1: '#55efc4', color2: '#00cec9' },
        { lg: 'linear-gradient(330deg, #fab1a0, #e17055)', angle: '330deg', color1: '#fab1a0', color2: '#e17055' },
        { lg: 'linear-gradient(340deg, #ffeaa7, #fdcb6e, #e67e22)', angle: '340deg', color1: '#ffeaa7', color2: '#fdcb6e', color3: '#e67e22' },
        { lg: 'linear-gradient(350deg, #636e72, #2d3436)', angle: '350deg', color1: '#636e72', color2: '#2d3436' },
        { lg: 'linear-gradient(360deg, #1abc9c, #16a085)', angle: '360deg', color1: '#1abc9c', color2: '#16a085' },
        { lg: 'linear-gradient(120deg, #1a1a1a, #414141)', angle: '120deg', color1: '#1a1a1a', color2: '#414141' },
        { lg: 'linear-gradient(130deg, #ff5733, #c70039)', angle: '130deg', color1: '#ff5733', color2: '#c70039' },
        { lg: 'linear-gradient(140deg, #900c3f, #581845)', angle: '140deg', color1: '#900c3f', color2: '#581845' },
        { lg: 'linear-gradient(150deg, #1b1b1b, #4e4e50, #808080)', angle: '150deg', color1: '#1b1b1b', color2: '#4e4e50', color3: '#808080' },
        { lg: 'linear-gradient(160deg, #3498db, #2ecc71)', angle: '160deg', color1: '#3498db', color2: '#2ecc71' },
        { lg: 'linear-gradient(170deg, #f1c40f, #e67e22)', angle: '170deg', color1: '#f1c40f', color2: '#e67e22' },
        { lg: 'linear-gradient(180deg, #8e44ad, #c0392b, #f39c12)', angle: '180deg', color1: '#8e44ad', color2: '#c0392b', color3: '#f39c12' },
        { lg: 'linear-gradient(190deg, #27ae60, #2ecc71, #52be80)', angle: '190deg', color1: '#27ae60', color2: '#2ecc71', color3: '#52be80' },
        { lg: 'linear-gradient(200deg, #2980b9, #6dd5fa)', angle: '200deg', color1: '#2980b9', color2: '#6dd5fa' },
        { lg: 'linear-gradient(210deg, #e84393, #fd79a8)', angle: '210deg', color1: '#e84393', color2: '#fd79a8' },
        { lg: 'linear-gradient(220deg, #34495e, #2c3e50, #1c2833)', angle: '220deg', color1: '#34495e', color2: '#2c3e50', color3: '#1c2833' },
        { lg: 'linear-gradient(230deg, #fab1a0, #e17055)', angle: '230deg', color1: '#fab1a0', color2: '#e17055' },
        { lg: 'linear-gradient(240deg, #ffeaa7, #fdcb6e, #e67e22)', angle: '240deg', color1: '#ffeaa7', color2: '#fdcb6e', color3: '#e67e22' },
        { lg: 'linear-gradient(250deg, #ff9ff3, #f368e0)', angle: '250deg', color1: '#ff9ff3', color2: '#f368e0' },
        { lg: 'linear-gradient(260deg, #10ac84, #1dd1a1)', angle: '260deg', color1: '#10ac84', color2: '#1dd1a1' },
        { lg: 'linear-gradient(270deg, #ff6b6b, #ee5253)', angle: '270deg', color1: '#ff6b6b', color2: '#ee5253' },
        { lg: 'linear-gradient(280deg, #b71540, #e55039)', angle: '280deg', color1: '#b71540', color2: '#e55039' },
        { lg: 'linear-gradient(290deg, #5f27cd, #341f97)', angle: '290deg', color1: '#5f27cd', color2: '#341f97' },
        { lg: 'linear-gradient(300deg, #6c5ce7, #a29bfe)', angle: '300deg', color1: '#6c5ce7', color2: '#a29bfe' },
        { lg: 'linear-gradient(310deg, #fdcb6e, #e17055, #d63031)', angle: '310deg', color1: '#fdcb6e', color2: '#e17055', color3: '#d63031' },
        { lg: 'linear-gradient(320deg, #1abc9c, #16a085)', angle: '320deg', color1: '#1abc9c', color2: '#16a085' },
        { lg: 'linear-gradient(330deg, #f39c12, #e67e22)', angle: '330deg', color1: '#f39c12', color2: '#e67e22' },
        { lg: 'linear-gradient(340deg, #2d98da, #3867d6)', angle: '340deg', color1: '#2d98da', color2: '#3867d6' },
        { lg: 'linear-gradient(350deg, #c44569, #d980fa)', angle: '350deg', color1: '#c44569', color2: '#d980fa' },
        { lg: 'linear-gradient(360deg, #f8c291, #e55039)', angle: '360deg', color1: '#f8c291', color2: '#e55039' },
        { lg: 'linear-gradient(10deg, #4b6584, #2d98da, #eb3b5a)', angle: '10deg', color1: '#4b6584', color2: '#2d98da', color3: '#eb3b5a' },
        { lg: 'linear-gradient(20deg, #2c3e50, #4ca1af)', angle: '20deg', color1: '#2c3e50', color2: '#4ca1af' },
        { lg: 'linear-gradient(30deg, #0f2027, #203a43, #2c5364)', angle: '30deg', color1: '#0f2027', color2: '#203a43', color3: '#2c5364' },
        { lg: 'linear-gradient(40deg, #ee5253, #ff6b6b)', angle: '40deg', color1: '#ee5253', color2: '#ff6b6b' }
    ]);




    const darkNavGradients = ref<GradientInterface[]>([
        { lg: 'linear-gradient(90deg, rgba(0,24,70,1) 26%, rgba(91,151,205,1) 65%, rgba(0,24,70,1) 90%)', angle: '90deg', color1: 'rgba(0,24,70,1) 26%', color2: 'rgba(91,151,205,1) 65%', color3: 'rgba(91,151,205,1) 90%' },
        { lg: 'linear-gradient(#2c002c,#100f4e)', angle: '0deg', color1: '#2c002c', color2: '#100f4e' }, // Dark Gray
        { lg: 'linear-gradient(90deg, #232526, #414345)', angle: '90deg', color1: '#232526', color2: '#414345' }, // Dark Gray
        { lg: 'linear-gradient(90deg, #141E30, #243B55)', angle: '90deg', color1: '#141E30', color2: '#243B55' }, // Deep Blue
        { lg: 'linear-gradient(0deg,#4B0082FF, #663399FF)', angle: '0deg', color1: '#4B0082FF', color2: '#663399FF' }, // Deep Blue
        { lg: 'linear-gradient(360deg, #00000000 0%, #000000 100%)', angle: '360deg', color1: '#00000000 0%', color2: '#000000 100%' }, // Deep Blue
        { lg: 'linear-gradient(90deg, #0f0c29, #302b63, #24243e)', angle: '90deg', color1: '#0f0c29', color2: '#302b63', color3: '#24243e' }, // Dark Purple - Blue
        { lg: 'linear-gradient(90deg, #232526, #414345, #3a3a3a)', angle: '90deg', color1: '#232526', color2: '#414345', color3: '#3a3a3a' }, // Dark Metallic
        { lg: 'linear-gradient(90deg, #000428, #004e92)', angle: '90deg', color1: '#000428', color2: '#004e92' }, // Deep Navy
        { lg: 'linear-gradient(90deg, #434343, #000000)', angle: '90deg', color1: '#434343', color2: '#000000' }, // Black - Gray
        { lg: 'linear-gradient(90deg, #2C3E50, #4CA1AF)', angle: '90deg', color1: '#2C3E50', color2: '#4CA1AF' }, // Cool Blue-Gray
        { lg: 'linear-gradient(90deg, #0b0c10, #1f2833, #66fcf1)', angle: '90deg', color1: '#0b0c10', color2: '#1f2833', color3: '#66fcf1' }, // Cyber Dark
        { lg: 'linear-gradient(90deg, #2c3e50, #4b79a1)', angle: '90deg', color1: '#2c3e50', color2: '#4b79a1' }, // Dark Ocean Blue
        { lg: 'linear-gradient(90deg, #1e130c, #9a8478)', angle: '90deg', color1: '#1e130c', color2: '#9a8478' }, // Dark Brown
        { lg: 'linear-gradient(90deg, #373b44, #4286f4)', angle: '90deg', color1: '#373b44', color2: '#4286f4' }, // Dark Blue Glow
        { lg: 'linear-gradient(90deg, #485563, #29323c)', angle: '90deg', color1: '#485563', color2: '#29323c' }, // Dark Steel
        { lg: 'linear-gradient(90deg, #360033, #0b8793)', angle: '90deg', color1: '#360033', color2: '#0b8793' }, // Dark Magenta - Teal
        { lg: 'linear-gradient(90deg, #2b5876, #4e4376)', angle: '90deg', color1: '#2b5876', color2: '#4e4376' }, // Deep Purple-Blue
        { lg: 'linear-gradient(90deg, #000000, #434343, #666666)', angle: '90deg', color1: '#000000', color2: '#434343', color3: '#666666' }, // Black Gradient
        { lg: 'linear-gradient(90deg, #485563, #29323c, #1c1c1c)', angle: '90deg', color1: '#485563', color2: '#29323c', color3: '#1c1c1c' }, // Dark Steel with Black
        { lg: 'linear-gradient(90deg, #2e2e2e, #161616)', angle: '90deg', color1: '#2e2e2e', color2: '#161616' }, // Dark Charcoal
        { lg: 'linear-gradient(90deg, #09203f, #537895)', angle: '90deg', color1: '#09203f', color2: '#537895' }, // Deep Navy-Blue
        { lg: 'linear-gradient(90deg, #1d2b64, #f8cdda)', angle: '90deg', color1: '#1d2b64', color2: '#f8cdda' }, // Dark Blue - Rose
        { lg: 'linear-gradient(90deg, #16222a, #3a6073)', angle: '90deg', color1: '#16222a', color2: '#3a6073' }, // Deep Night Sky
        { lg: 'linear-gradient(90deg, #232526, #414345, #2c3e50)', angle: '90deg', color1: '#232526', color2: '#414345', color3: '#2c3e50' }, // Dark Gray - Blue
        { lg: 'linear-gradient(90deg, #3E5151, #DECBA4)', angle: '90deg', color1: '#3E5151', color2: '#DECBA4' }, // Dark Teal - Beige
        { lg: 'linear-gradient(90deg, #000000, #2c3e50, #2c3e50)', angle: '90deg', color1: '#000000', color2: '#2c3e50', color3: '#2c3e50' }, // Pure Black - Blue
        { lg: 'linear-gradient(90deg, #141E30, #243B55, #141E30)', angle: '90deg', color1: '#141E30', color2: '#243B55', color3: '#141E30' }, // Deep Blue Loop
        { lg: 'linear-gradient(90deg, #16222a, #3a6073, #16222a)', angle: '90deg', color1: '#16222a', color2: '#3a6073', color3: '#16222a' }, // Midnight Blue
        { lg: 'linear-gradient(90deg, #09203f, #537895, #09203f)', angle: '90deg', color1: '#09203f', color2: '#537895', color3: '#09203f' }, // Dark Sea Blue
        { lg: 'linear-gradient(90deg, #1e1e1e, #383838)', angle: '90deg', color1: '#1e1e1e', color2: '#383838' }, // Dark Gunmetal Gray
        { lg: 'linear-gradient(90deg, #0b0c10, #1f2833)', angle: '90deg', color1: '#0b0c10', color2: '#1f2833' }, // Cyber Gray
        { lg: 'linear-gradient(90deg, #090909, #232526)', angle: '90deg', color1: '#090909', color2: '#232526' }, // Shadow Gray
        { lg: 'linear-gradient(90deg, #232526, #3a3a3a)', angle: '90deg', color1: '#232526', color2: '#3a3a3a' }, // Charcoal Black
        { lg: 'linear-gradient(90deg, #1f1c2c, #928dab)', angle: '90deg', color1: '#1f1c2c', color2: '#928dab' }, // Dark Purple - Gray
        { lg: 'linear-gradient(90deg, #434343, #000000)', angle: '90deg', color1: '#434343', color2: '#000000' }, // Deep Carbon
        { lg: 'linear-gradient(90deg, #000000, #2C3E50)', angle: '90deg', color1: '#000000', color2: '#2C3E50' }, // Black Steel
        { lg: 'linear-gradient(90deg, #292E49, #536976)', angle: '90deg', color1: '#292E49', color2: '#536976' }, // Night Blue
        { lg: 'linear-gradient(90deg, #24243e, #302b63)', angle: '90deg', color1: '#24243e', color2: '#302b63' }, // Dark Blue Vibe
        { lg: 'linear-gradient(90deg, #1c1c1c, #434343)', angle: '90deg', color1: '#1c1c1c', color2: '#434343' } // Black Glow
    ]);

    let formData = reactive({
        selectedGradientNavbar:'',
        selectedGradientMenuBar:'',
        selectedGradientSideBar:'',
        selectedGradientSideBarButtom:'',
        selectedGradientNewIndex:'',
        selectedGradientPopup:'',
        selectedGradientInformation:'',
        selectedGradientActivity:'',
        selectedGradientNavFooter:'',
        selectedGradientFooter:'',
        selectedGradientBorder:'',
        selectedGradientButton:'',
        // detail
        text:"#F7F7F7",
    });


    const saveSettingGame = async (id:number) =>{
        const data = await saveSettingThemeServices(formData,id);
        if (data.status === "success") {
            Alert('success','อัพเดต Themes เรียบร้อย.')
        }
    }

    
    const selectGradient = (gradient: GradientInterface) => {
        if(activeKey.value == "1"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientNavbar = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientNavbar = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "2"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientMenuBar = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientMenuBar = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "3"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientSideBar = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientSideBar = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "4"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientNewIndex = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientNewIndex = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "5"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientPopup = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientPopup = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "6"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientInformation = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientInformation = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "7"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientSideBarButtom = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientSideBarButtom = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "8"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientActivity = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientActivity = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "9"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientNavFooter = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientNavFooter = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "10"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientFooter = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientFooter = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "11"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientBorder = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientBorder = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }else if(activeKey.value == "12"){
            if (!gradientValue.value || gradientValue.value.lg !== gradient.lg) {
                gradientValue.value = { ...gradient }; // ทำสำเนาเพื่อหลีกเลี่ยงการเปลี่ยนค่าต้นฉบับ
            }
            if (gradient.color3 != undefined) {
                formData.selectedGradientButton = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2}, ${gradient.color3})`;
            }else{
                formData.selectedGradientButton = `linear-gradient(${degree.value}deg, ${gradient.color1}, ${gradient.color2})`;
            }
        }

    };
    const angleChange = () => {
        if(activeKey.value == "1"){
            formData.selectedGradientNavbar = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "2"){
            formData.selectedGradientMenuBar = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "3"){
            formData.selectedGradientSideBar = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "4"){
            formData.selectedGradientNewIndex = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "5"){
            formData.selectedGradientPopup = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "6"){
            formData.selectedGradientInformation = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "7"){
            formData.selectedGradientSideBarButtom = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "8"){
            formData.selectedGradientActivity = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "9"){
            formData.selectedGradientNavFooter = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "10"){
            formData.selectedGradientFooter = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "11"){
            formData.selectedGradientBorder = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }else if(activeKey.value == "12"){
            formData.selectedGradientButton = gradientValue.value.color3
            ? `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2}, ${gradientValue.value.color3})`
            : `linear-gradient(${degree.value}deg, ${gradientValue.value.color1}, ${gradientValue.value.color2})`;
        }
    };
    

    const changeTab = () => {
        let match: RegExpMatchArray | null = null;
        let selectedGradientKey = "";
        if (activeKey.value == "1") {
            // ตรวจสอบว่า formData.selectedGradientNavbar มีค่า
            match = formData.selectedGradientNavbar.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientNavbar;
        } else if (activeKey.value == "2") {
            // ตรวจสอบว่า formData.selectedGradientMenuBar มีค่า
            match = formData.selectedGradientMenuBar.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientMenuBar;
        }else if (activeKey.value == "3") {
            match = formData.selectedGradientSideBar.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientSideBar;
        }else if (activeKey.value == "4") {
            match = formData.selectedGradientNewIndex.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientNewIndex;
        }else if (activeKey.value == "5") {
            match = formData.selectedGradientPopup.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientPopup;
        }else if (activeKey.value == "6") {
            match = formData.selectedGradientInformation.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientInformation;
        }else if (activeKey.value == "7") {
            match = formData.selectedGradientSideBarButtom.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientSideBarButtom;
        }else if (activeKey.value == "8") {
            match = formData.selectedGradientActivity.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientActivity;
        }else if (activeKey.value == "9") {
            match = formData.selectedGradientNavFooter.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientNavFooter;
        }else if (activeKey.value == "10") {
            match = formData.selectedGradientFooter.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientFooter;
        }else if (activeKey.value == "11") {
            match = formData.selectedGradientBorder.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientBorder;
        }else if (activeKey.value == "12") {
            match = formData.selectedGradientButton.match(/\((.*?)\)/);
            selectedGradientKey = formData.selectedGradientButton;
        }

        if (match) {
            let data = match[1]?.split(",") ?? []; // ใช้ Nullish Coalescing
            gradientValue.value.lg = selectedGradientKey;
            gradientValue.value.angle = data[0]?.trim() ?? "0deg";
            gradientValue.value.color1 = data[1]?.trim() ?? "#000000";
            gradientValue.value.color2 = data[2]?.trim() ?? "#FFFFFF";
            
            if (countHexColors(match[1]) == 3) {
                gradientValue.value.color3 = data[3]?.trim();
            }
        }
    };

    const countHexColors = (gradient: string): number => {
        return (gradient.match(/#/g) || []).length;
    };


    const getSettingThemes = async() =>{
        const data = await getSettingThemeServices();
        if (data.status === "success") {
            // page 1 
            formData.selectedGradientNavbar = data.data.navBarColor
            formData.selectedGradientMenuBar = data.data.menuBarColor
            formData.selectedGradientSideBar = data.data.sideBarColor
            formData.selectedGradientSideBarButtom = data.data.sideBarButtomColor
            formData.selectedGradientNewIndex = data.data.newIndexColor
            formData.selectedGradientPopup = data.data.popUpColor
            formData.selectedGradientInformation = data.data.informationColor
            formData.selectedGradientActivity = data.data.activityColor
            formData.selectedGradientNavFooter = data.data.navFooter
            formData.selectedGradientFooter = data.data.footer
            formData.selectedGradientBorder = data.data.borderColor
            formData.selectedGradientButton = data.data.buttonColor

            formData.text = data.data.text

            changeTab()
        }
    }

    onMounted(() => {
        getSettingThemes();
    });
    
</script>
<style scoped>
.center{
    text-align: center;
}
.input-color{
    cursor: pointer;
}

.gradient-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
}

.gradient-button {
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.gradient-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* แถบแสดงสีที่เลือก */
.selected-gradient-container {
  margin-top: 20px;
  text-align: center;
}

.gradient-bar {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  margin: 10px 0;
  border: 2px solid #ccc;
}

.gradient-code {
  font-family: monospace;
  background: #f4f4f4;
  padding: 8px;
  border-radius: 5px;
  display: inline-block;
}

</style>
<style>
.select-member-detail{
    margin: 0.20rem;
}
</style>