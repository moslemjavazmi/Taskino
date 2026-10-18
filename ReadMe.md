
# Taskino - task manager platform
## taskino business logic (cycle)

			User
			↓
			Create Task

			↓
			PENDING_APPROVAL

			↓
			Admin Approves

			↓
			OPEN

			↓
			Taskers See Task

			↓
			Tasker Sends Offer

			↓
			User Selects Offer

			↓
			Tasker Accepts

			↓
			SCHEDULED

			↓
			Task Starts

			↓
			IN_PROGRESS

			↓
			Completed

			↓
			Payment

			↓
			Review
	
	# MicroService Architecture 
			Auth Service
			├── Authentication
			├── JWT
			├── OTP
			├── Roles
			├── Permissions

			User Service
			├── User Profile
			├── Tasker Profile
			├── Skills
			├── Verification
			├── Reputation Summary

			Task Service
			├── Task Lifecycle
			├── Task Status
			├── Admin Approval
			├── Cancellation
			├── Task Timeline

			Offer Service
			├── Offers
			├── Customer Selection
			├── Tasker Confirmation

			Payment Service
			├── Escrow
			├── Transactions
			├── Wallet
			├── Refund

			Review Service
			├── Ratings
			├── Reviews
			├── Reputation Events

			Search Service
			├── Read Model
			├── Geo Search
			├── Matching

			Chat Service
			├── Conversations
			├── Messages
			├── Attachments
			├── Notifications

			AI Service (Future)
			├── Smart Matching
			├── Price Prediction
			├── Fraud Detection
			├── Task Categorization