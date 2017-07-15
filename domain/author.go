package domain

type Author struct {
	Bio			string	`json:"bio"`
	FirstName	string	`json:"firstName"`
	LastName	string	`json:"lastName"`
	PhotoURL	string	`json:"photoURL"`
	Website		string	`json:"website"`
}