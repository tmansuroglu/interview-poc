CREATE TABLE "records" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"vaccinated" boolean NOT NULL,
	"recorded_by_user_id" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_recorded_by_user_id_users_id_fk" FOREIGN KEY ("recorded_by_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;