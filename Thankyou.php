<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Courgette&display=swap" rel="stylesheet">
<!-- <link rel="stylesheet" href="styles.css"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background-color:#A4978C  ;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            font-size: 18px;;
           
        }

        h2{
            margin-top: 0;
            margin-left: 30px;
        }
            .name{
                color:#A98669;

            }
        .widget-box {
            background-color: #FFF; /* White background color for the widget box */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 100%;
        }
        ul {
            list-style-type: none;
            padding: 5px;
           
        }
        li{
            margin-top: 2px;;
        }
    </style>

</head>
<body>


<div class="widget-box">
    <?php if (isset($_POST['form_submitted'])): ?>
        <!-- This code is executed when the form is submitted -->

        <h2>Thank You <span style="color: #A98669;"><?php echo $_POST['fname']; ?> </span><br>Your message has been submitted!</h2>

     
        <h3><u>Submitted Information:</u></h3>
        <ul>
            <li><strong>First Name:</strong> <?php echo $_POST['fname']; ?></li>
            <li><strong>Last Name:</strong> <?php echo $_POST['lname']; ?></li>
            <li><strong>Email:</strong> <?php echo $_POST['email']; ?></li>
            <li><strong>Country Code:</strong> +<?php echo $_POST['countryCode']; ?></li>
        <li><strong>Phone Number:</strong> <?php echo $_POST['phone']; ?></li>
            <li><strong>Subject::</strong> <?php echo $_POST['subject']; ?></li>
            <li><strong>Message:</strong> <?php echo $_POST['message']; ?></li>
            <!-- Add other submitted information as needed -->
        </ul>

        <p>Go <a href="contactus.html" style="color:#A98669 ; text-decoration:none ;">back</a> to the form</p>

   

    <?php endif; ?> 
</div>

</body>
</html>
