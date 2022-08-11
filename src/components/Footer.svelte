<script>
    import logo from "$svg/logo.svg";
  </script>
  
  <footer class="footer">
    <div class="footer__logo__icon">
      <a href="https://ohmychart.com">{@html logo}</a>
    </div>
  </footer>
  
  <style>
    .footer {
      background-color: var(--color-primary-dark);
      height: 6rem;
      width: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: row;
      line-height: 0;
      align-items: center;
      justify-content: center;
    }
  
    .footer__logo__icon {
      width: 24px;
      margin: 1rem;
      display: inline-block;
    }
  
    .footer__logo__icon a {
      fill: var(--color-secondary);
      transition: 0.4s all;
    }

    .footer__logo__icon a:hover {
      fill: var(--color-accent);
    }
  
  </style>