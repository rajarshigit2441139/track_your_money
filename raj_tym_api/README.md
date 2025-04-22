# Track Your Money API (raj_tym_api)

A Spring Boot application for tracking personal finances and expenses.

## Prerequisites

- Java Development Kit (JDK) 21
- Maven 3.6+
- PostgreSQL 12+
- IDE (recommended: IntelliJ IDEA, Eclipse, or VS Code)

## Tech Stack

- Spring Boot 3.2.3
- Spring Data JPA
- PostgreSQL (Database)
- Maven (Build Tool)
- Lombok
- Spring Validation

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:agileguru/raj_tym_api.git
cd raj_tym_api
```

### 2. Database Setup

1. Install PostgreSQL if not already installed
2. Create a new PostgreSQL database:
```sql
CREATE DATABASE track_your_money;
```

### 3. Configure Application

Create `src/main/resources/application.properties` with the following configurations (adjust as needed):

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/track_your_money
spring.datasource.username=your_username
spring.datasource.password=your_password

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=8080
```

### 4. Build the Project

```bash
# Using Maven Wrapper
./mvnw clean install

# Or using Maven directly
mvn clean install
```

## Running the Application

### Using Maven Wrapper

```bash
./mvnw spring-boot:run
```

### Using Maven

```bash
mvn spring-boot:run
```

### Using JAR file

```bash
java -jar target/raj-tym-api-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

## Development

### Project Structure

```
raj_tym_api/
├── src/
│   ├── main/
│   │   ├── java/         # Java source files
│   │   └── resources/    # Application properties and static resources
│   └── test/             # Test files
├── pom.xml               # Maven configuration
└── README.md            # Project documentation
```

### Making Changes

1. Make your code changes
2. Run tests: `./mvnw test`
3. Build the project: `./mvnw clean install`
4. Start the application to test changes

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Add your license information here]

## Support

For support and questions, please [create an issue](repository-issues-url) or contact the development team.
