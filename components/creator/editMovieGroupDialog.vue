<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="600"
      scrollable
      :persistent="loading"
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title class="headline">
          Edit movie
          <v-btn
            icon
            absolute
            right
            :disabled="loading"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form action="#" autocomplete="off">
            <v-text-field
              v-model="title"
              name="title"
              label="Title"
              :disabled="loading"
              :error-messages="titleErrors"
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
            ></v-text-field>
            <v-textarea
              v-model="description"
              name="description"
              label="Description"
              auto-grow
              row-height="24"
              rows="1"
              counter
              :disabled="loading"
              :error-messages="descriptionErrors"
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
            ></v-textarea>
            <v-combobox
              v-model="creator"
              hide-selected
              label="Creator"
              multiple
              persistent-hint
              small-chips
              deletable-chips
              :disabled="loading"
            >
            </v-combobox>
            <v-combobox
              v-model="star"
              hide-selected
              label="Star"
              multiple
              persistent-hint
              small-chips
              deletable-chips
              :disabled="loading"
            />
            <v-combobox
              v-model="tag"
              hide-selected
              label="Tag"
              multiple
              persistent-hint
              small-chips
              deletable-chips
              :disabled="loading"
            />
            <v-text-field
              v-model="price"
              name="price"
              label="Price"
              hint="Number Only"
              suffix="$"
              :disabled="loading"
              @keypress="isNumber($event)"
            ></v-text-field>
            <v-text-field
              v-model="discount"
              name="discount"
              label="Discount"
              hint="Number Only"
              suffix="%"
              :disabled="loading"
              @keypress="isNumber($event)"
            ></v-text-field>
            <v-switch
              v-model="publics"
              class="ma-0"
              label="Public"
              :disabled="loading"
            ></v-switch>
          </v-form>
          <v-alert
            v-show="alertError && !loading"
            v-model="alertError"
            width="100%"
            type="error"
            dense
            dismissible
            text
            transition="scroll-y-transition"
          >
            {{ errors }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary darken-1"
            :disabled="loading"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            :disabled="$v.$invalid || loading"
            @click.prevent="submit(id)"
          >
            <v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="primary"
              :size="15"
              :width="2"
            ></v-progress-circular>
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    title: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(255),
    },
    description: {
      maxLength: maxLength(5000),
    },
  },
  data: () => ({
    dialog: false,
    loading: false,

    search: null,

    id: '',
    title: '',
    description: '',
    creator: [],
    star: [],
    tag: [],
    price: '',
    discount: '',
    publics: false,

    alertError: false,
    errors: '',
  }),
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.minLength &&
        errors.push('Title must be at least 4 characters long')
      !this.$v.title.maxLength &&
        errors.push('Title must be at most 255 characters long')
      !this.$v.title.required && errors.push('Title is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength &&
        errors.push('Description must be at most 5000 characters long')
      return errors
    },
  },
  watch: {
    creator(val) {
      if (val.length > 10) {
        this.$nextTick(() => this.creator.pop())
      }
    },
    star(val) {
      if (val.length > 20) {
        this.$nextTick(() => this.star.pop())
      }
    },
    tag(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.tag.pop())
      }
    },
  },
  methods: {
    async open(id) {
      const responseGroup = await this.$axios.$get(
        `/api/creator/movie-group/${id}`,
        { progress: false }
      )
      this.id = responseGroup._id
      this.title = responseGroup.title
      this.description = responseGroup.description
      this.creator = responseGroup.detail.creator
      this.star = responseGroup.detail.star
      this.tag = responseGroup.detail.tag
      this.price = responseGroup.price
      this.discount = responseGroup.discount
      this.publics = responseGroup.public
      this.dialog = true
    },
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault()
      }
    },
    async submit(id) {
      this.loading = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const sendData = {
          title: this.title,
          description: this.Format(this.description),
          detail: {
            creator: this.creator,
            star: this.star,
            tag: this.tag,
          },
          price: parseFloat(this.price || 0),
          discount: parseFloat(this.discount || 0),
          public: this.publics,
        }
        try {
          const editMovie = await this.$axios.$patch(
            `/api/creator/movie-group/${id}`,
            sendData,
            { progress: false }
          )
          if (editMovie) {
            this.$emit('update', editMovie)
            this.loading = false
            this.dialog = false
          }
        } catch (error) {
          this.alertError = true
          this.errors = error.response.data
          this.loading = false
        }
      }
    },
    Format(content) {
      if (!content || content.trim() === '') return ''
      // console.log(content)
      // content = content.replace("@", "")
      return content
        .replace(/@+/g, ' ')
        .replace(/\n\s*\n/g, '\n')
        .replace(/[ \t\r]+/g, ' ')
    },
  },
}
</script>
