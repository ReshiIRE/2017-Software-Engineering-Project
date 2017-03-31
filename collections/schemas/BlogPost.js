// setting up the blog schema
// this ist mostly self explainitory

var blogFields = {
	title: {
		type: String,
		label: 'Title'
	},
	text: {
		type: String,
		label: 'Text',
		autoform: {
			type: 'textarea',
			rows: 5
		}
	},
	_id: {
		type: String,
		optional: true,
		autoform: {
			omit: true
		}
	},
	userId: {
		type: String,
		optional: true,
		autoform: {
			omit: true
		}
	},
	author: {
		type: String,
		optional: true,
		autoform: {
			omit: true
		}
	},
	createdAt: {
		type: Date,
		optional: true,
		autoform: {
			omit: true
		}
	}
};

BlogSchema = new SimpleSchema(blogFields);