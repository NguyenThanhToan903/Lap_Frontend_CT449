<template>
  <div class="page-row">
    <div class="col-md-10">
      <InputSearch v-model="searchText"></InputSearch>
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <ContactList
        v-if="fillteredContactCount > 0"
        :contacts="fillteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i>
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus">Thêm mới</i>
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard :contact="activeContact" />
      </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "../components/ContactCard.vue";
import InputSearch from "../components/InputSearch.vue";
import ContactList from "../components/ContactList.vue";
import ContactService from "../services/contact.service";

export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      // Giám sát các thay đổi của biến searchText.
      // Bỏ chọn phần tử đang được chọn trong danh sách.
      this.activeIndex = -1;
    },
  },

  computed: {
    //chuyể các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
  },
  // trả về các contact có chứa thông tin cần tìm kiếm.
  fillteredContacts() {
    if (!this.searchText) return this.contacts;
    return this.contacts.filter((_contacts, index) => {
      this.contactStrings[index].includes(this.searchText);
    });
  },
  activeContact() {
    if (this.activeIndex < 0) return null;
    return this.fillteredContacts[this.activeIndex];
  },

  fillteredContactCount() {
    return this.fillteredContacts.length;
  },

  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Bạn có muốn xóa tất cả liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    TouchList.refreshList();
  },
  //Đoạn xử lý đầy đủ sẽ trình bài bên dưới
};
</script>

<style scoped>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
