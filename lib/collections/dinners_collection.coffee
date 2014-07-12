formatDate = (date) ->
  moment(date).format('dddd MMMM D')

@Dinners = new Meteor.Collection 'dinners',
  transform: (dinner) ->
    _(dinner).extend(formattedDate: formatDate(dinner.date))

Dinners.allow
  update: (dinner) ->
    @userId == dinner.hostId

Meteor.methods
  createDinner: ->
    unless Meteor.user()
      throw new Meteor.Error(422, 'You must be signed in to create a dinner')

    latestDinner = Dinners.findOne({ hostId: @userId }, { sort: { date: -1 } })
    today = new Date
    latestDinnerDate = if latestDinner && latestDinner > today
      latestDinner.date
    else
       today

    Dinners.insert
      hostId: @userId
      date: followingFriday(latestDinnerDate).valueOf()
